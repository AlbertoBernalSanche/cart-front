import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProduct } from '../domain/add-product';
import { CleanCart } from '../domain/clean-cart';
import { CreateCart } from '../domain/create-cart';
import { RemoveProduct } from '../domain/remove-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url:string=environment.apiUrl+"api/cart/";
  constructor(public httpClient:HttpClient) { }

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders({'Authorization':token});
    return headers;
  }

  public createCart(createCart:CreateCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post(this.url+'createCart',createCart,{headers:headers});
  }

  public addProduct(addProduct:AddProduct):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post(this.url+'addProduct',addProduct,{headers:headers});
  }

  public removeProduct(removeProduct:RemoveProduct):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post(this.url+'removeProduct',removeProduct,{headers:headers});
  }

  public cleanCart(cleanCart:CleanCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post(this.url+'clearCart',cleanCart,{headers:headers});
  }

  public findShoppingProductByShoppingCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findShoppingProductByShoppingCart/'+carId,{headers:headers});
  }
  public findShoppingCartAvailable(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findShoppingCartAvailable/'+email,{headers:headers});
  }
}
