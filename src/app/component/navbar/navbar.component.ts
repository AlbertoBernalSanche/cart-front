import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public tipo:string;

  constructor(
    public authCartService:AuthCartService,
    public router:Router,
    
  ) { }

  

  
  ngOnInit(): void {
    this.updateTipo();
  }

  
  public updateTipo():void{

    this.tipo=localStorage.getItem("tipo");
    console.log("tipo "+this.tipo);

  }

  public singOut():void{
    this.authCartService.singOut()
    .then(()=>{
      
      localStorage.clear();
      this.updateTipo();
      this.router.navigate(['/login']);

    })
    .catch(e=>{
      
      localStorage.clear();
      this.updateTipo();
      this.router.navigate(['/login']);
    });
  }

}
