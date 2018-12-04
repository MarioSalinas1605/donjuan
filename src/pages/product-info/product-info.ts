import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {
  item: any = {}
  sizes: any = {}
  size: string = ''
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage) {
    this.item = navParams.get('item')
    this.sizes = this.item.sizes
    
    storage.set('name', 'Max');
    // Or to get a key/value pair
    storage.get('name').then((val) => {
      console.log('Your name is', val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }

}
