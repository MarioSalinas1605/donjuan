import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  operation: string = 'login';
  name: string = ''
  email: string = ''
  number: number
  password: string = ''
  password2: string = ''
  user
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private storage: Storage,
    private userProvider: UserProvider,
    private alertCtrl: AlertController) {
    this.operation = 'login'


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Has ingresado a tu cuenta',
      buttons: ['Ok']
    });
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });

    this.authenticationProvider.loginWithEmail(this.email, this.password)
    .then(
      (data)=>{
        alert.present();
        console.log(data.user.uid)
        let subscription = this.userProvider.get(data.user.uid).valueChanges().subscribe((udata)=>{
          console.log(udata)
          if(udata){
            this.user = udata
            this.storage.set('user', this.user);
            this.navCtrl.setRoot(TabsPage);
          }
        })
      }
    ).catch(
      (error)=>{
        alertError.present();
        console.log(error)
      }
    )

  }

  register(){
    let alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Te has registrado de manera correcta',
      buttons: ['Ok']
    });
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });

    if(this.verifydata()){
      let person = {
        name: this.name,
        email: this.email,
        number: this.number,
        address: ''
      }

      this.authenticationProvider.registerWithEmail(this.email, this.password)
      .then(
        (data)=>{
          let obj: any = {uid: data.user.uid, email: data.user.email, name: this.name, number: this.number}
          this.storage.set('user', obj);
          alert.present();
          console.log(data)
          this.userProvider.add(obj)
        }
      ).catch(
        (error)=>{
          alertError.present();
          console.log(error)
        }
      )
    }
  }

  verifydata(){
    let alertPassword = this.alertCtrl.create({
      title: 'Verificar',
      subTitle: 'Las contraseñas deben ser iguales',
      buttons: ['Ok']
    });

    let alertInput = this.alertCtrl.create({
      title: 'Verificar',
      subTitle: 'Completa todos los campos',
      buttons: ['Ok']
    });

    if (this.password != this.password2) {
        alertPassword.present()
        return false;
    }
    if(this.password==''){
      alertInput.present()
      return false;
    }
    if(this.password2==''){
      alertInput.present()
      return false;
    }
    if(this.email==''){
      alertInput.present()
      return false;
    }
    if(this.name == ''){
      alertInput.present()
      return false;
    }
    if(this.number == null){
      alertInput.present()
      return false;
    }
    return true;
  }

}
