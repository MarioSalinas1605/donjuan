import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductModifPage } from '../product-modif/product-modif';
import { OrderPage } from '../order/order';
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';

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
  statusOrder
  orderid
  answerData: any
  answerCheapest: any
  answerClosest: any
  subscription: any
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    public orderProvider: OrderProvider,
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
    this.statusOrder = false
    this.orderid = null
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
          this.getAnswers()
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
    let toast = this.toastCtrl.create({
      message: 'Selcciona un producto antes',
      duration: 1500,
      position: 'top'
    });
    if(this.items.length > 0){
      this.navCtrl.push(OrderPage)
    }else{
      toast.present()
    }
  }
  stopSearch(){
    console.log(this.orderid)
    let orderStatus: any = {
      status: false
    }
    this.statusOrder = false;
    this.storage.set('order', orderStatus);
    console.log("Search stopped")
    this.getAnswers()
  }
  getAnswers(){
    console.log(`Searching order: ${this.orderid}`)
    this.subscription = this.orderProvider.getList(this.orderid).valueChanges().subscribe((data)=>{
      console.log(data)
      this.answerData = data
      if(this.answerData.answers){
        this.searchCheapest();
        this.searchClosest()
      }
    })
  }
  searchCheapest(){
    // console.log('Searching cheapest with:')
    // console.log(this.answerData.answers)
    for (let answer in this.answerData.answers){
      if(!this.answerCheapest){
        this.answerCheapest=this.answerData.answers[answer]
        // console.log('firs cheap')
        // console.log(this.answerCheapest)
      }else{
        if (this.answerData.answers[answer].totalPrice < this.answerCheapest.totalPrice) {
            this.answerCheapest = this.answerData.answers[answer]
            // console.log(`New cheapest:`)
            // console.log(this.answerCheapest)
        }
      }
    }
    console.log('The cheapest is: ')
    console.log(this.answerCheapest)
  }
  searchClosest(){
    for (let answer in this.answerData.answers){
      if(!this.answerClosest){
        this.answerClosest=this.answerData.answers[answer]
      }else{
        if (this.answerData.answers[answer].distance < this.answerClosest.distance) {
            this.answerClosest = this.answerData.answers[answer]
        }
      }
    }
    console.log('The closest is: ')
    console.log(this.answerClosest)
  }
  confirmOrder(store){
    let alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Tu pedido llegará en unos minutos',
      buttons: ['Ok']
    });
    console.log(store)
    console.log(this.answerData)
    let newOrder = {
      sid: store.store.uid,
      list: store.list,
      price: store.totalPrice,
      oid:store.oid,
      user: this.answerData.user,
      markerlatlong: this.answerData.markerlatlong
    }
    let orderid = this.answerData.id
    this.subscription.unsubscribe()
    this.orderProvider.delete(orderid)
    this.orderProvider.confirmOrder(newOrder).then((data)=>{
      console.log("Confirmación enviada")
    })
    this.userProvider.addOrderProcess(newOrder)
    this.restartVars()
    alert.present()
  }
  restartVars(){
    this.items = null
    this.statusOrder = null
    this.orderid = null
    this.answerData = null
    this.answerCheapest = null
    this.answerClosest = null
    this.subscription = null
    let orderStatus: any = {
      status: false
    }
    this.statusOrder = false;
    this.storage.set('order', orderStatus);
  }
}
