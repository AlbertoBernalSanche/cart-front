import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  public payId:string;
  public paymentMethod:PaymentMethod;

  constructor(
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public paymentMethodService:PaymentMethodService

  ) { }

  ngOnInit(): void {

    let params=this.activatedRoute.params['_value'];
    this.payId=params.payId;
    this.findById();
  }

  public findById():void{
    this.paymentMethodService.findById(this.payId).subscribe(data=>{
      this.paymentMethod=data;
      console.table(this.paymentMethod);
    });
  }

}
