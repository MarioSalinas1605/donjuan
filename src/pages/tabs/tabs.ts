import { Component } from '@angular/core';

import { ProductsPage } from '../products/products';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { InformationPage } from '../information/information';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProductsPage;
  tab2Root = ShoppingCartPage;
  tab3Root = InformationPage;

  constructor() {

  }
}
