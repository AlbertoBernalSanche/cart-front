import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string;
  public password: string;
  public name: string;
  public address: string;
  public phone: string;
  //public msg: string = "";
  public customer: Customer;


  public showMsg: boolean = false;
  public messages: string[] = [""];


  constructor(public authCartService: AuthCartService,
    public router: Router,
    public customerService: CustomerService
  ) { }

  ngOnInit(): void {

  }

  public register(): void {

    this.customer = new Customer(this.email, this.address, "N", this.name, this.phone, this.password, "C");
    
    this.customerService.save(this.customer).subscribe(
      ok => {
      console.log("save user")

      this.authCartService.createUser(this.email, this.password).then(() => {
        console.log("save user firebase")
        var user = firebase.auth().currentUser;

        this.customer.token = user.uid;
        this.authCartService.sendEmailVerification();
        this.customerService.update(this.customer).subscribe(ok => {

          console.log("update user")

          this.showMsg = true;
          this.messages[0] = "el product se modifico con exito";
          
          this.router.navigate(['/login']);

        }, err => {
          console.log(err);
          this.showMsg = true;
          this.messages = err.error.error;


        })

      }).catch(e => {

        console.log(e);
        this.showMsg = true;
        this.messages = e.error.error;

      })

    }, err => {
      console.log("error "+err.error);
      //this.showMsg = true;
      //this.messages = e.error.error;
    });

    //-------------------------------------------------------
   
  }

  

}
