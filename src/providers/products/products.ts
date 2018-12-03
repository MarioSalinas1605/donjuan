import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  products: any = [
    {id: 1, name: 'Coca-Cola', sizes:{size1:'200ml',size2:'237ml',size3: '250ml', size4:'350ml', size5:'370ml', size6:'500ml', size7:'1lt', size8:'1.5lt', size9:'2lt', size10:'2.5lt', size11:'3lt'},
      image:'/assets/imgs/coca.jpg', category:'grocery'},
    {id: 2, name: 'Sangria', sizes:{size1: '250ml', size2:'350ml', size3:'500ml', size4:'2lt', size5:'2.5lt', size6:'3lt'},
        image:'/assets/imgs/coca.jpg', category:'grocery'},
    {id: 3, name: 'Zanahorias', sizes:{size1:'250gr', size2:'500gr', size3:'1kg'},
      image:'/assets/imgs/zanahoria.jpg', category:'fresh'}

  ]

  constructor(public http: HttpClient) {
    console.log('Hello ProductsProvider Provider');
  }

  getGroceries(){
    return this.products.filter((product)=>{ return product.category == 'grocery' })
  }
  getFresh(){
    return this.products.filter((product)=>{ return product.category == 'fresh' })
  }

}
