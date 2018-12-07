import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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
    private storage: Storage,
    private alertCtrl: AlertController) {
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
   let alert = this.alertCtrl.create({
    title: 'Listo...',
    subTitle: 'Agregamos el producto a tu carrito de compras',
    buttons: ['ok']
  });
   this.storage.get('productList').then((val) => {
     if (val) {
         let coca: any = {name:'coca', size:'2lt', quantity:'2'}
         val.list.push(coca)
         this.storage.set('productList', val);
         console.log(val)
         alert.present();
     }else{
       let obj: any = {status: 'pending', list:[{
         name: this.item.name,
         size: this.size,
         quantity: this.quantity}]
       }
       this.storage.set('productList', obj);
       console.log(obj)
       alert.present();
     }
   })
 }

 testDelete(){
   this.storage.remove('productList').then(()=>{
     console.log("Elements deleted")
   })

 }

}
