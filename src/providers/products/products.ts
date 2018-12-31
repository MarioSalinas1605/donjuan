import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  products: any = [
    // {id: 1, name: 'Coca-Cola', sizes:{size1:'200ml',size2:'237ml',size3: '250ml', size4:'350ml', size5:'370ml', size6:'500ml', size7:'1lt', size8:'1.5lt', size9:'2lt', size10:'2.5lt', size11:'3lt'},
    //   image:'/assets/imgs/coca.jpg', category:'grocery'},
    {id: 1, name: 'Coca-Cola', sizes:['200ml', '237ml', '250ml', '350ml', '370ml', '500ml', '1lt', '1.5lt', '2lt', '2.5lt', '3lt'],
      image:'/assets/imgs/coca.jpg', category:'grocery'},
    {id: 2, name: 'Sangria', sizes:['250ml','350ml','500ml','2lt','2.5lt','3lt'],
        image:'/assets/imgs/coca.jpg', category:'grocery'},
    {id: 3, name: 'Zanahorias', sizes:['250gr','500gr','1kg'],
      image:'/assets/imgs/zanahoria.jpg', category:'fresh'}

  ]

  constructor(public http: HttpClient, public afDB: AngularFireDatabase) {
    console.log('Hello ProductsProvider Provider');
  }

  getGroceries(){
    return this.products.filter((product)=>{ return product.category == 'grocery' })
    // return this.afDB.list('/products/grocery')
  }
  getFresh(){
    return this.products.filter((product)=>{ return product.category == 'fresh' })
  }

}
