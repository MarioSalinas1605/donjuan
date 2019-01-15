import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ProductInfoPage } from '../product-info/product-info';
import { NewProductPage } from '../new-product/new-product';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  search: string = ''
  groceries: any = {}
  fresh: any = {}
  categories: string = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, public productsProvider: ProductsProvider, public modalCtrl: ModalController) {
    this.groceries = productsProvider.getGroceries()
    this.fresh = productsProvider.getFresh()
    this.categories='groceries'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  presentModal(item, category) {
    const modal = this.modalCtrl.create(ProductInfoPage, {item:item, category:category});
    modal.present();
  }

  modalNewProduct() {
    const modal = this.modalCtrl.create(NewProductPage);
    modal.present();
  }

}
