import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {

  public titulo:string='lista de metodos de pago';
  public showMsg:boolean=false;
  public messages:string[]=[""];
  public paymentMethods:PaymentMethod[];

  constructor(public paymentMethodService:PaymentMethodService) { }

  ngOnInit(): void {
    this.findAll();
  }
  findAll():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.paymentMethods=data;

    },error=>{
      
      console.error(error);
    });
  }

  public delete(payId:number){
    this.messages=[""]
    this.paymentMethodService.delete(payId).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="el paymentMethod se borro con exito";
      this.findAll();
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.messages=err.error.error;
      
    });
  }


}
