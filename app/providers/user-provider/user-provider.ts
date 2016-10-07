import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { FirebaseRef, AngularFire, FirebaseListObservable } from 'angularfire2';
import { LocalStorage, Storage } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { UtilProvider } from '../../providers/utils';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

   local = new Storage(LocalStorage);
   //allusers: FirebaseListObservable<any>;

  constructor(public af:AngularFire, public ul: UtilProvider) {


    //this.allusers = af.database.list('/users');


  }

  getUid(){
  	return this.local.get('userInfo').then(value =>{ // the login user info stored in the local storage
  		let newValue = JSON.parse(value);
  		return newValue.uid;

  	});
  }

  createUser(userCredentails){
  	this.getUid().then(uid => {
  		let currentUserRef = this.af.database.object('/users/'+uid);

  		currentUserRef.set({
  			email:userCredentails.email
  		});

  	});
  }

  getUser(){
  	return this.getUid().then(uid => {
  		return this.af.database.object('/users/'+uid);
  	});
  }

  getAllUsers(){
    
    //return this.allusers;
    return this.af.database.list('/users/');
  }

 

  getPicture(){

  	let base64Picture;

  	let options = {
  		destinationType: 0,
  		sourceType: 0,
  		encodingType: 0
  	};

  	let promise = new Promise((resolve, reject) => {

  		Camera.getPicture(options).then((imageData) => {

  			base64Picture = "data:image/jpeg;base64," + imageData;
  			resolve(base64Picture);

  		  }, (error) => {

  		  	reject(error);

  		});

  	});

  	return promise;

  }

  updatePicture(){

  	this.getUid().then(uid => {
  		let prictureRef = this.af.database.object('/users/'+uid+'/picture');

  		this.getPicture().then((image) => {
  			prictureRef.set(image);
  		});
  	});
  }

}

