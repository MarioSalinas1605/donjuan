import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductModifPage } from '../product-modif/product-modif';

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
  items: any = []
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  presentModal(item) {
    const modal = this.modalCtrl.create(ProductModifPage, {item:item, "parentPage": this});
    modal.present();
  }

  testBorrar(){
    this.storage.remove('productList').then(()=>{
      console.log("Elements deleted")
    })
    this.items = []
  }

  ionViewWillEnter() {
    console.log("Switch to ShoppingCartPage");
    this.storage.get('productList').then((val) => {
      if (val) {
          this.items = val.list
      }
      console.log(this.items)
    })
  }

  refreshList(){
    this.storage.get('productList').then((val) => {
      if (val) {
          this.items = val.list
      }
      console.log(this.items)
    })
  }
}
