import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { CartService } from 'src/app/service/cart.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-client',
  templateUrl: './shopping-cart-client.component.html',
  styleUrls: ['./shopping-cart-client.component.css']
})
export class ShoppingCartClientComponent implements OnInit {

  
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public shoppingCarts:ShoppingCart[];
  public email:string;

  constructor(
    public shoppingCartService:ShoppingCartService,
    public cartService:CartService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
   //let params=this.activatedRoute.params['_value'];
    this.email=localStorage.getItem("email");

    this.findAll();
  }

  findAll():void{
    this.shoppingCartService.findShoppingCartByEmail(this.email).subscribe(data=>{
      this.shoppingCarts=data;
      localStorage.setItem("carEmail",this.email)

    },error=>{
      
      console.error(error);
    });
  }

  
}
