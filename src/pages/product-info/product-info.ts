import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, Tabs, ToastController } from 'ionic-angular';
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
  image: string = ''
  quantity = 1

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private app: App,
    private toastCtrl: ToastController) {
    this.item = navParams.get('item')
    this.sizes = this.item.sizes
    this.image = this.item.image
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }

 saveProduct(){
   let toast = this.toastCtrl.create({
     message: 'Producto agregado',
     duration: 1500,
     position: 'top'
   });
   this.storage.get('productList').then((val) => {
     if (val) {
         let coca: any = {name: this.item.name, size: this.size, quantity: this.quantity, image: this.image, sizes: this.sizes}
         val.list.push(coca)
         this.storage.set('productList', val);
         // console.log(val)
         // alert.present();
     }else{
       let obj: any = {status: 'pending', list:[{
         name: this.item.name,
         size: this.size,
         quantity: this.quantity,
         image: this.image,
         sizes: this.sizes}]
       }
       this.storage.set('productList', obj);
       // console.log(obj)
       // alert.present();
     }
     toast.present();
     this.viewCtrl.dismiss();
   })
 }

 pay(){
   // this.storage.remove('productList').then(()=>{
   //   console.log("Elements deleted")
   // })

   this.storage.get('productList').then((val) => {
     if (val) {
         let coca: any = {name: this.item.name, size: this.size, quantity: this.quantity, image: this.image, sizes: this.sizes}
         val.list.push(coca)
         this.storage.set('productList', val);
         console.log(val)
         const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
         tabsNav.select(1);
         this.navCtrl.pop();
     }else{
       let obj: any = {status: 'pending', list:[{
         name: this.item.name,
         size: this.size,
         quantity: this.quantity,
         image: this.image,
         sizes: this.sizes}]
       }
       this.storage.set('productList', obj);
       console.log(obj)
       const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
       tabsNav.select(1);
       this.navCtrl.pop();
     }
   })

 }


}
