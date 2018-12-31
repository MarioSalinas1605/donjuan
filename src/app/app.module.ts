import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CoverPage } from '../pages/cover/cover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InformationPage } from '../pages/information/information';
import { ProductsPage } from '../pages/products/products';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ProductInfoPage } from '../pages/product-info/product-info';
import { ProductsProvider } from '../providers/products/products';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ProductModifPage } from '../pages/product-modif/product-modif';
import { NewProductPage } from '../pages/new-product/new-product';

export const firebaseConfig = {
  apiKey: "AIzaSyCMjs-827aomemKULQ5uFXuR_w06Higk0s",
    authDomain: "donjuan-d3d8f.firebaseapp.com",
    databaseURL: "https://donjuan-d3d8f.firebaseio.com",
    projectId: "donjuan-d3d8f",
    storageBucket: "donjuan-d3d8f.appspot.com",
    messagingSenderId: "885737150162"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InformationPage,
    ProductsPage,
    ShoppingCartPage,
    ProductInfoPage,
    LoginPage,
    CoverPage,
    ProductModifPage,
    NewProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InformationPage,
    ProductsPage,
    ShoppingCartPage,
    ProductInfoPage,
    LoginPage,
    CoverPage,
    ProductModifPage,
    NewProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsProvider,
    AuthenticationProvider
  ]
})
export class AppModule {}
