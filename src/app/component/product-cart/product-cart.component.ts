import { Component, OnInit } from '@angular/core';

import { AddProduct } from 'src/app/domain/add-product';
import { CreateCart } from 'src/app/domain/create-cart';
import { Product } from 'src/app/domain/product';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { AlertService } from 'src/app/service/alert.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {


  public titulo: string = "lista de productos";
  public products: Product[];
  public showMsg: boolean = false;
  public messages: string[] = [""];

  public quantity: number = 1;
  public carId: number;
  public shoppingCart: ShoppingCart;
  public email: string;
  public cart: CreateCart;

  public word:string;
  public max:number;
  public min:number;

  public addProductCart: AddProduct;



  constructor(
    public productService: ProductService,
    public cartService: CartService,
    public alertService:AlertService


  ) { }

  ngOnInit(): void {

    this.findAll();
    this.findShoppingCartAvailable();
  }

  public findByNameContainsIgnoreCase(){
    if (this.word=="" || this.word==null) {
      this.findAll()
      
    } else {
      this.productService.findByNameContainsIgnoreCase(this.word).subscribe(data=>{
        this.products=data;
      },err=>{
        this.alertService.info("no se encontro la busqueda")
        console.log(err)
      })
    }
    
  }

  public findProductByWordAndPrice(){
    this.productService.findProductByWordAndPrice(this.word,this.max,this.min).subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err)
    })
  }

  findAll(): void {
    this.productService.findProductAvalaible().subscribe(data => {
      this.products = data;
      
    }, error => {

      console.error(error);
    });
  }

  public addProduct(proId: string) {

    this.messages = [""]


    this.addProductCart = new AddProduct(this.carId, proId, this.quantity);

    this.cartService.addProduct(this.addProductCart).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "el product se añadio al carro con exito";
      this.alertService.success("producto añadido al carro con exito")
    }, err => {
      console.log(err);
      this.showMsg = true;
      this.messages = err.error.error;
      this.alertService.error("error al añadir el producto")

    });
  }

  public findShoppingCartAvailable(): void {
    this.email = localStorage.getItem("email");
    this.cartService.findShoppingCartAvailable(this.email).subscribe(data => {
      this.shoppingCart = data;

      if (this.shoppingCart==null) {
        console.log(this.email);
        this.cart = new CreateCart(this.email);
        this.cartService.createCart(this.cart).subscribe(data1=>{
          this.shoppingCart=data1;
          this.carId=this.shoppingCart.carId;

          localStorage.setItem("cart", this.carId.toString());
          
        },err=>{
          console.log(err);
        });
        
  
      } else {
        console.log("shoppingCar:" + this.shoppingCart.carId)
        this.carId = this.shoppingCart.carId;
        console.log("carId: " + this.carId)
        localStorage.setItem("cart",this.carId.toString() );
  
      }

    }, error => {

      console.error(error);
    });
    

  }

}
