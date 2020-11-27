import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { CartService } from 'src/app/service/cart.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent implements OnInit {

  public paymentMethods:PaymentMethod[];
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public carId:number=15;
  public shoppingCart:ShoppingCart;

  constructor(
    public cartService:CartService,
    public paymentMethodService:PaymentMethodService,
    public shoppingCartService:ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.findById();
    this.findPaymentMethods();
    
  }

  public findPaymentMethods():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.paymentMethods=data;
    },error=>{
      console.error(error);
    });
  }

  public findById():void{

    this.shoppingCartService.findById(this.carId).subscribe(data=>{
      this.shoppingCart=data;
      this.shoppingCart.payId=1;
    });
  }
  public addPaymentMethod():void{
    //--------------------
    this.messages=[""]
    this.shoppingCartService.update(this.shoppingCart).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="se añadio el metodo de pago con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });

  }
}
