import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Tipo } from 'src/app/domain/tipo';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { TipoService } from 'src/app/service/tipo.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public email:string;
  public customer:Customer;
  public enables:Enable[];
  public tipos:Tipo[];
  public showMsg:boolean=false;
  public messages:string[]=[""];

  constructor(public router:Router,
    public activatedRoute:ActivatedRoute,
    public customerService:CustomerService,
    public enableService:EnableService,
    public tipoService:TipoService
    ) { }

  ngOnInit(): void {
    let params=this.activatedRoute.params['_value'];
    this.email=params.email;
    this.findById();
    this.findAllEnable();
    this.findAllTipo();
  }

  public findById():void{

    this.customerService.findById(this.email).subscribe(data=>{
      this.customer=data;
      console.table(this.customer);
    });
  }

  public findAllEnable():void{
    this.enables=this.enableService.findAll();
  }

  public findAllTipo():void{
    this.tipos=this.tipoService.findAll();
  }

  public update(){
    this.messages=[""]
    this.customerService.update(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el customer se modifico con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }

  public delete(){
    this.messages=[""]
    this.customerService.delete(this.customer.email).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el customer se borro con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }



}
