import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ProductInfoPage } from '../product-info/product-info';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  presentModal() {
    const modal = this.modalCtrl.create(ProductInfoPage);
    modal.present();
  }

  testBorrar(){
    this.storage.remove('productList').then(()=>{
      console.log("Elements deleted")
    })
  }
}
