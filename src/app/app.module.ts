import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import {FormsModule} from '@angular/forms';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { LoginComponent } from './component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCartComponent } from './component/product-cart/product-cart.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { AddPaymentMethodComponent } from './component/add-payment-method/add-payment-method.component';
import { CartComponent } from './component/cart/cart.component';
import { ShoppinProductComponent } from './component/shoppin-product/shoppin-product.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './component/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    CustomerSaveComponent,
    CustomerEditComponent,
    ProductSaveComponent,
    PaymentMethodSaveComponent,
    PaymentMethodEditComponent,
    ProductEditComponent,
    LoginComponent,
    ProductCartComponent,
    ShoppingCartComponent,
    AddPaymentMethodComponent,
    CartComponent,
    ShoppinProductComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
