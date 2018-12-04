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
  quantity = 0

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage) {
    this.item = navParams.get('item')
    this.sizes = this.item.sizes
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }

 saveProduct(){
   let obj: any = {name:this.item.name, size: this.size, quantity: this.quantity}
   this.storage.set('product', obj);
   // Or to get a key/value pair
   this.storage.get('product').then((val) => {
     console.log('Your product is:', val);
   });
 }

}
