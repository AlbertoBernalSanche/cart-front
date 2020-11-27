import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { CartService } from 'src/app/service/cart.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public showMsg:boolean=false;
  public messages:string[]=[""];
  public shoppingCarts:ShoppingCart[];
  constructor(
    public shoppingCartService:ShoppingCartService,
    public cartService:CartService
  ) { }

  ngOnInit(): void {

    this.findAll();
  }

  findAll():void{
    this.shoppingCartService.findAll().subscribe(data=>{
      this.shoppingCarts=data;

    },error=>{
      
      console.error(error);
    });
  }

  
}
