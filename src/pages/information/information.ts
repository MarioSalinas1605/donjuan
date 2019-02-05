import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { RecordProvider } from '../../providers/record/record';
import { EditUserPage } from '../edit-user/edit-user';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  user: any
  list: any
  listRecords: any

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private authenticationProvider: AuthenticationProvider,
  private userProvider: UserProvider,
  public modalCtrl: ModalController,
  private recordProvider: RecordProvider,
  private storage: Storage,
  private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if(val){
        this.user = val
        this.userProvider.getOrderProcess(this.user.uid).valueChanges().subscribe((data)=>{
          if(data){
            this.list = data
          }
        })
        this.recordProvider.get(this.user.uid).valueChanges().subscribe((data)=>{
          if(data){
            this.listRecords = data
            console.log(this.listRecords)
          }
        })
      }
    })

  }

  logOut(){
    let alert = this.alertCtrl.create({
      title: 'Fue un gusto atenderte!',
      subTitle: 'Esperamos que vuelvas',
      buttons: ['Ok']
    });
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });

    this.authenticationProvider.logOut()
    .then(
      (data)=>{
        alert.present();
        console.log(data)
        this.navCtrl.setRoot(LoginPage);
      }
    ).catch(
      (error)=>{
        alertError.present();
        console.log(error)
      }
    )
  }

  sendtToEdit(user){
    console.log(user)
    const modal = this.modalCtrl.create(EditUserPage, {user:user, "parentPage": this});
    modal.present();
  }
}
