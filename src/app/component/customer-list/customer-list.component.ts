import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public titulo:string='Lista de clientes';
  public customers:Customer[];
  public showMsg:boolean=false;
  public messages:string[]=[""];

  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.customerService.findAll().subscribe(data=>{
      this.customers=data;

    },error=>{
      
      console.error(error);
    });
  }

  public delete(email:string){
    this.messages=[""]
    this.customerService.delete(email).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el customer se borro con exito";
      this.findAll();
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }

}
