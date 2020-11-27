import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPaymentMethodComponent } from './component/add-payment-method/add-payment-method.component';
import { CartComponent } from './component/cart/cart.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { ProductCartComponent } from './component/product-cart/product-cart.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { ShoppinProductComponent } from './component/shoppin-product/shoppin-product.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { AngularFireAuth } from '@angular/fire/auth';

import { from } from 'rxjs';

import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './component/register/register.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-list',component:ProductListComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-edit/:proId',component:ProductEditComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-save',component:ProductSaveComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'payment-method-list',component:PaymentMethodListComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'payment-method-edit/:payId',component:PaymentMethodEditComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'payment-method-save',component:PaymentMethodSaveComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'customer-save',component:CustomerSaveComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'customer-edit/:email',component:CustomerEditComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-cart',component:ProductCartComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'cart',component:CartComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'add-payment-method',component:AddPaymentMethodComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-cart',component:ShoppingCartComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shoppin-product/:carId',component:ShoppinProductComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
