import { Component, OnInit } from '@angular/core';
import { parse } from 'path';
import { CleanCart } from 'src/app/domain/clean-cart';
import { CreateCart } from 'src/app/domain/create-cart';
import { RemoveProduct } from 'src/app/domain/remove-product';
import { ShoppinProduct } from 'src/app/domain/shoppin-product';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public carId:number;
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public shoppingProducts:ShoppinProduct[];
  public remove:RemoveProduct;
  public clean:CleanCart;
  public shoppingCart: ShoppingCart;
  public email: string;
  public cart: CreateCart;

  constructor(
    public cartService:CartService
    ) { }

  ngOnInit(): void {

    this.carId=Number(localStorage.getItem("cart"));
    this.findShoppingProductsByShoppingCart();
  }

  public findShoppingProductsByShoppingCart():void{

    

    this.cartService.findShoppingProductByShoppingCart(this.carId).subscribe(data=>{
      this.shoppingProducts=data;

    },error=>{
      
      console.error(error);
    });
  }

  public cleanCart():void{

    this.clean=new CleanCart(this.carId);

    this.cartService.cleanCart(this.clean).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el carro se limpio con exito";
      this.findShoppingProductsByShoppingCart();
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }

  public removeProduct(carId:number,proId:string):void{

    this.remove=new RemoveProduct(carId,proId);
    this.cartService.removeProduct(this.remove).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el product se removio con exito";
      this.findShoppingProductsByShoppingCart();
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });

  }

  public findShoppingCartAvailable(): void {
    this.email = localStorage.getItem("email");
    this.cartService.findShoppingCartAvailable(this.email).subscribe(data => {
      this.shoppingCart = data;

      if (this.shoppingCart==null) {
        console.log(this.email);
        this.cart = new CreateCart(this.email);
        this.cartService.createCart(this.cart);
  
      } else {
        console.log("shoppingCar:" + this.shoppingCart.carId)
        this.carId = this.shoppingCart.carId;
        console.log("carId: " + this.carId)
  
      }

    }, error => {

      console.error(error);
    });
    

  }


}
