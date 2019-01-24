import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

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
  password: string = ''
  password2: string = ''
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private storage: Storage,
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
        let obj: any = {uid: data.user.uid, email: data.user.email}
        this.storage.set('user', obj);
        this.navCtrl.setRoot(TabsPage);
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

    let person = {
      name: this.name,
      email: this.email,
      address: ''
    }

    if (this.password == this.password2) {
        console.log(person)
    }

    this.authenticationProvider.registerWithEmail(this.email, this.password)
    .then(
      (data)=>{
        let obj: any = {uid: data.user.uid, email: data.user.email}
        this.storage.set('user', obj);
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
