import { Component, ViewChild } from '@angular/core';

import { ProductsPage } from '../products/products';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { InformationPage } from '../information/information';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root: any = ProductsPage;
  tab2Root: any = ShoppingCartPage;
  tab3Root: any = InformationPage;

  constructor() {

  }
}
