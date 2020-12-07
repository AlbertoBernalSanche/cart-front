import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/app';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/domain/customer';
import { NavbarComponent } from '../navbar/navbar.component';
import { $ } from 'protractor';
import { AlertService } from 'src/app/service/alert.service';


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
  public token: string = "";
  public customer: Customer;


  constructor(
    private router: Router,
    private authService: AuthService,
    public authCartService: AuthCartService,
    public customerService: CustomerService,
    public alertService:AlertService
    

  ) { }

  ngOnInit(): void {
    
  }

  public login(): void {

    //validar usuario en firebase
    this.authCartService.login(this.email, this.password)
      .then(() => {
        var user = firebase.auth().currentUser;
        this.token = user.uid;
        console.log(this.token);
        this.user = new User(this.email, this.token);

        //validar email y token en base de datos
        this.authService.loginUser(this.user).subscribe(data => {

          localStorage.setItem("usuario", JSON.stringify(this.user));
          localStorage.setItem("token", data.token);

          //buscar usuario para validar informacion
          this.customerService.findById(this.email).subscribe(data => {
            this.customer = data;

            localStorage.setItem("email", this.customer.email);

            //validar si el usuario esta activo en base de datos
            if (this.customer.enable == "N") {

              //validar si el usuario se verifico en firebase
              if (user.emailVerified.valueOf() == true) {
                this.customer.enable = "Y";
                this.customerService.update(this.customer).subscribe(ok => {

                  //dirigir segun tipo de usuario
                  if (this.customer.tipo == "A") {
                    this.customerService.setUser(this.customer)
                    this.router.navigate(['/customer-list']);
                  } else {
                    
                    this.customerService.setUser(this.customer);
                    this.router.navigate(['/product-cart']);
                  }

                }, err => {
                  console.log(err);
                  

                });

              } else {
                console.log("error al validar el estado del usuario")
                this.alertService.error("error al verificar las credenciales intentelo de nuevo");
                this.singOut();
              }

            } else {

              //dirigir segun tipo de usuario
              if (this.customer.tipo == "A") {

                this.customerService.setUser(this.customer)
                this.router.navigate(['/customer-list']);
              } else {
                this.customerService.setUser(this.customer)
                this.router.navigate(['/product-cart']);
              }

            }



          }, err => {
            console.log(err);
            this.showMsg = true;
            this.messages = err.error.error;
            this.alertService.error("error al verificar las credenciales intentelo de nuevo");
            
          })


        }, err => {
          console.log(err);
          this.showMsg = true;
          this.messages = err.error.error;
          this.alertService.error("error al verificar las credenciales intentelo de nuevo");
          
        })
      })
      .catch(e => {
        console.log(e);
        this.showMsg = true;
        this.messages = e.messages;
        this.alertService.error("error al verificar las credenciales intentelo de nuevo");
       
      });
  }

  
  public singOut(): void {
    this.authCartService.singOut()
      .then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);

      })
      .catch(e => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });
  }

}
