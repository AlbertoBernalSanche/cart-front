import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public titulo: string = "lista de productos";

  public products: Product[];
  public product: Product;

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(public productService: ProductService) { }


  ngOnInit(): void {
    this.findAll()
  }

  findAll(): void {
    this.productService.findAll().subscribe(data => {
      this.products = data;

    }, error => {

      console.error(error);
    });
  }

  public inhabilitar(proId: string) {
    this.productService.findById(proId).subscribe(data => {
      this.product = data
      this.product.enable = "N"
      this.productService.update(this.product).subscribe(ok => {
        this.showMsg = true;
        this.messages[0] = "el product se inhabilitar con exito";
        this.findAll();
      }, err => {
        console.log(err)
      })
    })
  }
  public habilitar(proId: string) {
    this.productService.findById(proId).subscribe(data => {
      this.product = data
      this.product.enable = "Y"
      this.productService.update(this.product).subscribe(ok => {
        this.showMsg = true;
        this.messages[0] = "el product se inhabilitar con exito";
        this.findAll();
      }, err => {
        console.log(err)
      })
    })
  }


  public delete(proId: string) {
    this.messages = [""]
    this.productService.delete(proId).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "el product se borro con exito";
      this.findAll();
    }, err => {
      console.log(err);
      this.showMsg = true;
      this.messages = err.error.error;

    });
  }
}
