import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the RecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider {

  constructor(public http: HttpClient,
    private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello RecordProvider Provider');
  }

  get(uid){
    return this.angularFireDatabase.list('users/' + uid + '/records/')
  }

}
