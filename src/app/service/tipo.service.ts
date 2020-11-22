import { Injectable } from '@angular/core';
import { Tipo } from '../domain/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  public tipos:Tipo[];
  constructor() { 

    this.tipos=[
      {id:'C',name:'CLIENT'},
      {id:'A',name:'ADMIN'}

    ]
  }

  public findAll():Tipo[]{
    return this.tipos;
  }
}
