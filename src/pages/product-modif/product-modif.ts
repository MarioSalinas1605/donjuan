import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

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
  id:any
  item: any = {}
  sizes: any = {}
  size: string = ''
  image: string = ''
  quantity = 1
  show: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private app: App,
    public toastCtrl: ToastController) {
      this.item = navParams.get('item')
      this.sizes = this.item.sizes
      this.image = this.item.image
      this.size = this.item.size
      this.quantity = this.item.quantity
      this.id = this.item.id
      console.log(this.size)
      if (this.item.sizes) {
          this.show = true
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModifPage');
  }

  dismiss() {
     this.viewCtrl.dismiss();
  }

  deleteItem(){
    let newList: any = []
    this.storage.get('productList').then((val) => {
      console.log(val)
      // console.log(this.id)

      let list = val.list
      for (let i = 0; i < list.length; i++) {
        if(list[i].id != this.id){
          newList.push(list[i])
        }
      }
      val.list = newList
      console.log(val)
      this.storage.remove('productList').then(()=>{
        console.log("Elements deleted")
        const toast = this.toastCtrl.create({
          message: 'Producto eliminado',
          position: 'top',
          duration: 1500
        });
        toast.present();
      })
      this.storage.set('productList', val);

      this.navParams.get("parentPage").refreshList();
      this.navCtrl.pop();
    })
  }

  modifyItem(){
    let newList: any = []
    this.storage.get('productList').then((val) => {
      console.log(val)
      // console.log(this.id)

      let list = val.list
      for (let i = 0; i < list.length; i++) {
        if(list[i].id == this.id){
          console.log('new size:', this.size)
          list[i].size = this.size
          list[i].quantity = this.quantity
          newList.push(list[i])
        }else{
          newList.push(list[i])
        }
      }
      val.list = newList
      console.log(val)

      this.storage.set('productList', val);
      const toast = this.toastCtrl.create({
        message: 'Cambios guardados',
        position: 'top',
        duration: 1500
      });
      toast.present();

      this.navParams.get("parentPage").refreshList();
      this.navCtrl.pop();
    })
  }

  showSizes(){
    console.log('Showing sizes')
    for (let s of this.sizes) {
        console.log(s)
    }
    return true
  }

}
