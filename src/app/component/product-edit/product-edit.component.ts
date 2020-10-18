import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public proId:string;
  public product:Product;

  constructor(
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public productService:ProductService
  ) { }

  ngOnInit(): void {
    let params=this.activatedRoute.params['_value'];
    this.proId=params.proId;
    this.findById();
  }

  public findById():void{

    this.productService.findById(this.proId).subscribe(data=>{
      this.product=data;
      console.table(this.product);

    });
  }

}
