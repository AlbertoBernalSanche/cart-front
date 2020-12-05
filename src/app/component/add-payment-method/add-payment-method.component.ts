import { Component, OnInit } from '@angular/core';
import { CreateCart } from 'src/app/domain/create-cart';
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
  public carId:number;
  public shoppingCart:ShoppingCart;
  public email:string;
  public createCart:CreateCart;
  public payId:number;

  constructor(
    public cartService:CartService,
    public paymentMethodService:PaymentMethodService,
    public shoppingCartService:ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.carId=Number(localStorage.getItem("cart"));
    this.email=localStorage.getItem("email");
    this.findById();
    this.findPaymentMethods();
    
  }

  public findPaymentMethods():void{
    this.paymentMethodService.findPaymentMethodAvalaible().subscribe(data=>{
      this.paymentMethods=data;
    },error=>{
      console.error(error);
    });
  }

  public findById():void{

    this.shoppingCartService.findById(this.carId).subscribe(data=>{
      this.shoppingCart=data;
      //this.shoppingCart.payId=1;
    });
    
  }
  public addPaymentMethod():void{
    //--------------------
    /*console.log(this.shoppingCart.carId);
    console.log(this.shoppingCart.total);
    console.log(this.email);
    console.log(this.payId);*/
    this.shoppingCart.email=this.email;
    this.shoppingCart.payId=this.payId;
    /*console.log("carId "+this.shoppingCart.carId);
    console.log("email "+this.shoppingCart.email)
    console.log("payID "+this.shoppingCart.payId);
    console.log("items "+this.shoppingCart.items);
    console.log("total "+this.shoppingCart.total);
    console.log("enable "+this.shoppingCart.enable);*/
    
    this.messages=[""]
    this.shoppingCartService.update(this.shoppingCart).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="se añadio el metodo de pago con exito";
      this.createCart=new CreateCart(this.email);
      this.cartService.createCart(this.createCart).subscribe(data=>{
        this.shoppingCart=data;
      });
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });

  }
}
