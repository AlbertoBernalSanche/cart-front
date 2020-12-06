import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { User } from 'src/app/domain/user';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public tipo: string = null;
  public logged: any;
  customer: Customer;

  constructor(
    public authCartService: AuthCartService,
    public router: Router,
    public customerService: CustomerService
  ) {
    this.customerService.getUserObservable().subscribe((data) => {
      this.customer = data
      if (this.customer.tipo == "") {
        this.tipo = null;
      } else {
        this.tipo = this.customer.tipo;
      }

    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {

  }

  public singOut(): void {
    this.authCartService.singOut()
      .then(() => {

        localStorage.clear();
        this.tipo = null;
        this.router.navigate(['/login']);

      })
      .catch(e => {

        localStorage.clear();
        this.tipo = null;
        this.router.navigate(['/login']);
      });
  }

}
