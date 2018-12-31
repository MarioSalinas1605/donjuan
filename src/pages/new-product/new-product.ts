import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController, ToastController, App, Tabs } from 'ionic-angular';

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {
  name: string = ''
  size: string = ''
  quantity: number = 0
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    private storage: Storage,
    private app: App,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }

 saveProduct(){
   console.log(`Nombre: ${this.name} Tamaño: ${this.size} Cantidad: ${this.quantity}`)
   let toast = this.toastCtrl.create({
     message: 'Producto agregado',
     duration: 1500,
     position: 'top'
   });
   this.storage.get('productList').then((val) => {
     if (val) {
         let item: any = {
           id: Date.now(),
           name: this.name,
           size: this.size,
           quantity: this.quantity,
           image: "../../assets/imgs/abarrotes.jpg"
         }
         val.list.push(item)
         this.storage.set('productList', val);
         // console.log(val)
         // alert.present();
     }else{
       let obj: any = {status: 'pending', list:[{
         id: Date.now(),
         name: this.name,
         size: this.size,
         quantity: this.quantity,
         image: "../../assets/imgs/abarrotes.jpg"}]
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
         let coca: any = {
           id: Date.now(),
           name: this.name,
           size: this.size,
           quantity: this.quantity,
           image: "../../assets/imgs/abarrotes.jpg"
         }
         val.list.push(coca)
         this.storage.set('productList', val);
         console.log(val)
         const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
         tabsNav.select(1);
         this.navCtrl.pop();
     }else{
       let obj: any = {status: 'pending', list:[{
         id: Date.now(),
         name: this.name,
         size: this.size,
         quantity: this.quantity,
         image: "../../assets/imgs/abarrotes.jpg"}]
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
