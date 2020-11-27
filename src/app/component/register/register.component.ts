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

  public email:string;
  public password:string;
  public name:string;
  public address:string;
  public phone:string;
  public msg:string="";
  public customer:Customer;

  
  public showMsg:boolean=false;
  public messages:string[]=[""];
  

  constructor(public authCartService:AuthCartService,
              public router:Router,
              public customerService:CustomerService
              ) { }

  public register():void{
    this.authCartService.createUser(this.email,this.password)
    .then(()=>{
      var user=firebase.auth().currentUser;
      
      this.customer=new Customer(this.email,this.address,"Y",this.name,this.phone,user.uid,"C");
      this.customerService.save(this.customer).subscribe(ok=>{
        this.showMsg=true;
        this.messages[0]="el customer se guardo con exito";
        this.authCartService.sendEmailVerification();
        this.router.navigate(['/login']);
      },err=>{
        console.log(err);
        this.showMsg=true;
        this.messages=err.error.error;
        
      });
      
    })
    .catch(e=>{
      console.log(e);
        this.showMsg=true;
        this.messages=e.error.error;
    });
  }

  ngOnInit(): void {
    
  }

}
