import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { ShoppinProduct } from 'src/app/domain/shoppin-product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shopping-product-client',
  templateUrl: './shopping-product-client.component.html',
  styleUrls: ['./shopping-product-client.component.css']
})
export class ShoppingProductClientComponent implements OnInit {

  public carId:number;
  public email:string;
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public shoppingProducts:ShoppinProduct[]=[];
  public products:Product[]=[];
  constructor(
    public cartService:CartService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public productService:ProductService
  ) { }

  ngOnInit(): void {

    let params=this.activatedRoute.params['_value'];
    this.carId=params.carId;
    this.email=localStorage.getItem("carEmail")
    this.findShoppingProductCart();
  }

  public findShoppingProductCart():void{
    this.cartService.findShoppingProductByShoppingCart(this.carId).subscribe(data=>{
      this.shoppingProducts=data;
      for (let index = 0; index < this.shoppingProducts.length; index++) {
        this.productService.findById(this.shoppingProducts[index].productId).subscribe(data1=>{
          this.products[index]=  data1
        },err=>{
          console.log(err)
        })
      }
    },error=>{
      console.error(error);
    });
    
  }

  

  public volver():void{
    this.router.navigate(['/shopping-cart-client']);
    
  }

}
