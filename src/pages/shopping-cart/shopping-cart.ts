import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductModifPage } from '../product-modif/product-modif';
import { OrderPage } from '../order/order';

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
  statusOrder = false
  orderid
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
          console.log(this.items)
      }else{
        this.items=[]
      }
    })
    this.storage.get('order').then((val)=> {
      if (val) {
        this.statusOrder = val.status;
        this.orderid = val.oid;
        if(this.statusOrder){
          console.log("Se tiene una orden en proceso")
        }
      }
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
  goToOrder(){
    this.navCtrl.push(OrderPage)
  }
  stopSearch(){
    console.log(this.orderid)
    let orderStatus: any = {
      status: false
    }
    this.statusOrder = false;
    this.storage.set('order', orderStatus);
    console.log("Seach stopped")
  }
}
