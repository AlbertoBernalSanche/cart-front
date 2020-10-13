import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'payment-method-list',component:PaymentMethodListComponent},
  {path:'customer-save',component:CustomerSaveComponent},
  {path:'customer-edit/:email',component:CustomerEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
