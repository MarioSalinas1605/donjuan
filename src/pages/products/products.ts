import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public productsProvider: ProductsProvider) {
    this.groceries = productsProvider.getGroceries()
    this.fresh = productsProvider.getFresh()
    this.categories='groceries'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
