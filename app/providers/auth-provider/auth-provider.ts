import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
import { FirebaseAuth, FirebaseRef, AngularFire} from 'angularfire2';
//import 'rxjs/add/operator/map';

import { LocalStorage, Storage } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

	local = new Storage(LocalStorage);
	//firebase:any;
  constructor(public af: AngularFire) {}

  getAuth(){


  	return firebase.auth();//a mark here

  };

  signin(credentails){

  	return this.af.auth.login(credentails); //a mark here
  }

  createAccount(credentails){
  	return this.af.auth.createUser(credentails); //a mark here
  };

  logout(){
  	var auth = firebase.auth();

  	auth.signOut();
  }
}

