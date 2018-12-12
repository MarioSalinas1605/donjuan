import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductModifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-modif',
  templateUrl: 'product-modif.html',
})
export class ProductModifPage {
  item: any = {}
  sizes: any = {}
  size: string = ''
  image: string = ''
  quantity = 1

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.item = navParams.get('item')
      this.sizes = this.item.sizes
      this.image = this.item.image
      this.size = this.item.size
      this.quantity = this.item.quantity
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModifPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
