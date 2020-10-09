import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'payment-method-list',component:PaymentMethodListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
