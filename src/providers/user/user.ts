import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient,
  private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }

  add(user){
    return this.angularFireDatabase.object('users/' + user.uid + '/information/').set(user);
  }

  get(uid){
    return this.angularFireDatabase.object('users/' + uid + '/information/')
  }

  addOrderProcess(order){
    return this.angularFireDatabase.object('users/' + order.user.uid + '/process/' + order.oid).set(order)
  }

  getOrderProcess(uid){
    return this.angularFireDatabase.list('users/' + uid + '/process/')
  }

}
