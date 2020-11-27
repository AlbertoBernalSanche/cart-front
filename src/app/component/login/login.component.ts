import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/app';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/domain/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public showMsg: boolean = false;
  public messages: string[] = [""];
  public email: string;
  public password: string;
  public msg: string = "";
  public token: string = "";
  public customer: Customer;

  constructor(
    private router: Router,
    private authService: AuthService,
    public authCartService: AuthCartService,
    public customerService: CustomerService

  ) { }

  ngOnInit(): void {
    //this.user=new User("admin","password");
  }

  /*public ingresar():void{

    this.authService.loginUser(this.user).subscribe(data=>{
      localStorage.setItem("usuario",JSON.stringify(this.user));
      localStorage.setItem("token",data.token);
      this.router.navigate(['/customer-list']);
    },err=>{
      this.showMsg=true;
      this.messages[0]="Usuario o clave no son validos"

    })
  }*/

  public login(): void {

    this.authCartService.login(this.email, this.password)
      .then(() => {
        var user = firebase.auth().currentUser;
        this.token = user.uid;
        //this.token=localStorage.getItem("user");
        console.log(this.token);
        this.user = new User(this.email, this.token);
        this.authService.loginUser(this.user).subscribe(data => {
          localStorage.setItem("usuario", JSON.stringify(this.user));
          localStorage.setItem("token", data.token);

          this.customerService.findById(this.email).subscribe(data => {
            this.customer = data;
            if (this.customer.tipo == "A") {
              this.router.navigate(['/product-cart']);

            } else {

              this.router.navigate(['/customer-list']);
            }

          }, err => {
            console.log(err);
            this.showMsg = true;
            this.messages = err.error.error;
          })


        }, err => {
          console.log(err);
          this.showMsg = true;
          this.messages = err.error.error;

        })
      })
      .catch(e => {
        console.log(e);
        this.showMsg = true;
        this.messages = e.error.error;
      });
  }

}
