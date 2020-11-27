import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthCartService {

  constructor(public angularFireAuth:AngularFireAuth) {
    this.angularFireAuth.authState.subscribe(user=>{
      if(user){
        localStorage.setItem('user',JSON.stringify(user.uid));
      }else{
        localStorage.removeItem('user');
      }
    });
  }


  public createUser(email:string,password:string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email,password);
  }

  public login(email:string,password:string){
    return this.angularFireAuth.signInWithEmailAndPassword(email,password);
  }

  public singOut(){
    return this.angularFireAuth.signOut();
  }

  public async sendEmailVerification(){
    await (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  public sendPasswordResetEmail(email:string){
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }
}
