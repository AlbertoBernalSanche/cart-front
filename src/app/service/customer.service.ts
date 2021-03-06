import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: Customer = new Customer("", "", "", "", "", "", "");
  
  private userSubject = new BehaviorSubject(this.customer);

  private url: string = environment.apiUrl + 'api/customer/';

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findAll', { headers: headers });
  }

  public findById(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + email, { headers: headers });
  }
  public delete(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + email, { headers: headers });
  }

  public save(customer: Customer): Observable<any> {
    //let headers=this.createTokenHeader();

    return this.httpClient.post(this.url + 'save', customer);

  }

  public update(customer: Customer): Observable<any> {
    //let headers=this.createTokenHeader();

    return this.httpClient.put(this.url + 'update', customer);

  }

  //-------------------------------
  getUserObservable(): Observable<Customer> {
    return this.userSubject.asObservable();
  }

  // Este método se usa para enviar los cambios a todos los componentes a la escucha
   setUser(user: Customer) {
    this.customer = user;
    // Refrescar user en los observables
    this.userSubject.next(this.customer);
  }
}
