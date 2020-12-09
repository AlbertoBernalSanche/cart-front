import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Tipo } from 'src/app/domain/tipo';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { TipoService } from 'src/app/service/tipo.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public customer: Customer;
  public enables: Enable[];
  public tipos: Tipo[];
  public email:string;
  public password:string;
  public name:string;
  public address:string;
  public phone:string;
  public enableC:string="Y";
  public tipoC:string="C";

  public showMsg: boolean = false;
  public messages: string[] = [""];


  constructor(public customerService: CustomerService,
    public enableService: EnableService,
    public tipoService: TipoService,
    public authCartService: AuthCartService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "Y", "", "", "", "C");
    this.findAllEnable();
    this.findAllTipo();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findAllTipo(): void {
    this.tipos = this.tipoService.findAll();
  }

  public save() {
    this.messages = [""]
    this.customerService.save(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "el customer se guardo con exito";
    }, err => {
      console.log(err);
      this.showMsg = true;
      this.messages = err.error.error;

    });
  }

  public register(): void {

    this.customer = new Customer(this.email, this.address, "Y", this.name, this.phone, this.password, "C");
    
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
          
          this.router.navigate(['/customer-list']);

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
      console.log("error "+err);
      //this.showMsg = true;
      //this.messages = e.error.error;
    });

    //-------------------------------------------------------
   
  }
}
