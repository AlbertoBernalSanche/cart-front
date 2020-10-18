import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'product-edit/:proId',component:ProductEditComponent},
  {path:'product-save',component:ProductSaveComponent},
  {path:'payment-method-list',component:PaymentMethodListComponent},
  {path:'payment-method-edit/:payId',component:PaymentMethodEditComponent},
  {path:'payment-method-save',component:PaymentMethodSaveComponent},
  {path:'customer-save',component:CustomerSaveComponent},
  {path:'customer-edit/:email',component:CustomerEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
