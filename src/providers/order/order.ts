import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient, private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello OrderProvider Provider');
  }

  add(order) {
    return this.angularFireDatabase.object('orders/' + order.id).set(order);
  }

  getList() {
    return this.angularFireDatabase.list('orders/');
  }

}
