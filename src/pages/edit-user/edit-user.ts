import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Tabs, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {
  user
  name: string
  number: number
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public userProvider: UserProvider,
    private app: App,
    private storage: Storage,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
      this.user = navParams.get('user')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  dismiss() {
     this.viewCtrl.dismiss();
  }

  modifyItem(){
    let toast = this.toastCtrl.create({
      message: 'Sus datos se han modificado',
      duration: 1500,
      position: 'top'
    });
    if(this.name){
      this.user.name = this.name
      if(this.number){
        this.user.number = this.number
        this.userProvider.add(this.user)
        this.storage.set('user', this.user);
        const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
        tabsNav.select(3);
        this.navCtrl.pop();
        toast.present()
      }
    }
  }

}
