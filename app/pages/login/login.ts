import { Component } from '@angular/core';
import { NavController,Storage, LocalStorage } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { IntroPage } from '../intro/intro';
import { validateEmail } from '../../validators/email';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';
import { FirebaseAuth } from 'angularfire2';

import {FORM_DIRECTIVES, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormGroup} from '@angular/forms';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class LoginPage {

	loginForm: any;
	storage = new Storage(LocalStorage);
  constructor(public nav: NavController, form:FormBuilder, public auth: AuthProvider, public userProvider: UserProvider, public util:UtilProvider) {

  		this.loginForm = form.group({

  			email: ["",Validators.required],

  			password:["",Validators.required]

  		});

  }

  signin(){

    let loadingPage = this.util.presentLoading();

    loadingPage.present();

  	this.auth.signin(this.loginForm.value).then((data) => {
  		this.storage.set('userInfo', JSON.stringify(data));
  		this.nav.push(TabsPage);
  	}, (error) => {
  		let errormessage = "Please enter correct Email and password";
  		let alert = this.util.doAlert("Error", errormessage,"OK");
  		alert.present();

  	});
  };

createAccount(){
    let loadingPage = this.util.presentLoading();

    loadingPage.present();
	let credentials = this.loginForm.value;
	this.auth.createAccount(credentials).then((data) => {

		this.storage.set('userInfo', JSON.stringify(data));
		this.userProvider.createUser(credentials);
		},

		(error) => {

			let errorMessage = "Account already exists, try another email";

			let alert = this.util.doAlert("Error", errorMessage, "OK");
			alert.present();

	});
}

enterHelp(){
  this.nav.push(IntroPage);
}




}
