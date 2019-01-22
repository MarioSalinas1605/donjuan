import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, Tabs } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { OrderProvider } from '../../providers/order/order';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  payMode: string = ''
  map: GoogleMap;
  markerlatlong: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private app: App,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB2qyJBkvFWDCUer05D-U6Z3-wVVYFd5dI',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB2qyJBkvFWDCUer05D-U6Z3-wVVYFd5dI'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      console.log(response.latLng)
      this.markerlatlong = response.latLng
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng,
        draggable: true
      })
      .then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_DRAG_END)
                    .subscribe(() => {
                      this.markerlatlong = marker.getPosition();
                      console.log(`Lat: ${this.markerlatlong.lat} Lng: ${this.markerlatlong.lng}`)
                    });
                });
    })
    .catch(error =>{
      console.log(error);
    });
  }
  goToOrder(){
    let toast = this.toastCtrl.create({
      message: 'Orden Realizada! :)',
      duration: 1500,
      position: 'top'
    });
    let order
    this.storage.get('productList').then((val) => {
      if (val) {
          this.storage.get('user').then((user) => {
            console.log(this.markerlatlong)
            order = val
            order.id = Date.now()
            order.user = user
            order.markerlatlong = this.markerlatlong
            console.log(order)
            this.orderProvider.add(order)
            toast.present();
          })
      }
    })
    let orderStatus: any = {
      status: true
    }
    this.storage.remove('productList').then(()=>{
      console.log("productList deleted")
    })
    this.storage.get('productList').then((val)=>{
      console.log("Productos eliminados!")
      if(val){
        console.log(val)
      }
    })
    this.storage.set('order', orderStatus);
    // const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
    // tabsNav.select(1);
    this.navCtrl.pop();
  }

}
