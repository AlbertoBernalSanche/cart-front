import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { EnableService } from 'src/app/service/enable.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  public payId:number;
  public paymentMethod:PaymentMethod;
  public enables:Enable[];
  public showMsg:boolean=false;
  public messages:string[]=[""];


  constructor(
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public paymentMethodService:PaymentMethodService,
    public enableService:EnableService

  ) { }

  ngOnInit(): void {

    let params=this.activatedRoute.params['_value'];
    this.payId=params.payId;
    this.findById();
    this.findAllEnable();
  }

  public findById():void{
    this.paymentMethodService.findById(this.payId).subscribe(data=>{
      this.paymentMethod=data;
      console.table(this.paymentMethod);
    });
  }

  public findAllEnable():void{
    this.enables=this.enableService.findAll();
  }

  public update(){
    this.messages=[""]
    this.paymentMethodService.update(this.paymentMethod).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el payment method se modifico con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }

  public delete(){
    this.messages=[""]
    this.paymentMethodService.delete(this.paymentMethod.payId).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el paymentMethod se borro con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }

}
