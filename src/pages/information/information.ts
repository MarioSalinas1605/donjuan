import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private authenticationProvider: AuthenticationProvider,
  private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
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
}
