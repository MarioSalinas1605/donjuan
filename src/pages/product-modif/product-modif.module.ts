import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModifPage } from './product-modif';

@NgModule({
  declarations: [
    ProductModifPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModifPage),
  ],
})
export class ProductModifPageModule {}
