import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';

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
  name: string = 'name'
  email: string = 'email'
  password: string = 'password'
  password2: string = 'password2'
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider, private alertCtrl: AlertController) {
    this.operation = 'login'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginin(){
    let alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Te has loggeado de manera correcta',
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
        console.log(data)
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

    this.authenticationProvider.registerWithEmail(this.email, this.password)
    .then(
      (data)=>{
        alert.present();
        console.log(data)
      }
    ).catch(
      (error)=>{
        alertError.present();
        console.log(error)
      }
    )

  }

}
