import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the CoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html',
})
export class CoverPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider) {
    this.authenticationProvider.getStatus().subscribe(
      (session)=>{
        if (session) {
            this.navCtrl.setRoot(TabsPage)
        }
        else{
          this.navCtrl.setRoot(LoginPage)
        }
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoverPage');
  }

}
