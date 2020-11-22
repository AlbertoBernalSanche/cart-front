import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Tipo } from 'src/app/domain/tipo';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { TipoService } from 'src/app/service/tipo.service';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public customer:Customer;
  public enables:Enable[];
  public tipos:Tipo[];

  public showMsg:boolean=false;
  public messages:string[]=[""];
  

  constructor(public customerService:CustomerService,
    public enableService:EnableService, public tipoService:TipoService) { }

  ngOnInit(): void {
    this.customer=new Customer("","","Y","","","","C");
    this.findAllEnable();
    this.findAllTipo();
  }

  public findAllEnable():void{
    this.enables=this.enableService.findAll();
  }

  public findAllTipo():void{
    this.tipos=this.tipoService.findAll();
  }

  public save(){
    this.messages=[""]
    this.customerService.save(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el customer se guardo con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }
}
