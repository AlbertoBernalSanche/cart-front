import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppinProduct } from 'src/app/domain/shoppin-product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-shoppin-product',
  templateUrl: './shoppin-product.component.html',
  styleUrls: ['./shoppin-product.component.css']
})
export class ShoppinProductComponent implements OnInit {

  public carId:number;
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public shoppingProducts:ShoppinProduct[];
  constructor(
    public cartService:CartService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {

    let params=this.activatedRoute.params['_value'];
    this.carId=params.carId;
    this.findShoppingProductCart();
  }

  public findShoppingProductCart():void{
    this.cartService.findShoppingProductByShoppingCart(this.carId).subscribe(data=>{
      this.shoppingProducts=data;
    },error=>{
      console.error(error);
    });
  }


}
