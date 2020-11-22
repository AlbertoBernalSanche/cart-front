import { Component, OnInit } from '@angular/core';
import { ShoppinProduct } from 'src/app/domain/shoppin-product';
import { CartService } from 'src/app/service/cart.service';
import { RemoveProduct } from 'src/app/domain/remove-product';
import { CleanCart } from 'src/app/domain/clean-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public carId:number=15;
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public shoppingProducts:ShoppinProduct[];
  public remove:RemoveProduct;
  public clean:CleanCart;

  constructor(
    public cartService:CartService
    ) { }

  ngOnInit(): void {

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

}
