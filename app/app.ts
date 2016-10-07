
import { NavController, ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Component, Inject } from '@angular/core';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
//import { UsersPage } from './pages/users/users';
import { AuthProvider } from './providers/auth-provider/auth-provider';
import { ChatsProvider } from './providers/chats-provider/chats-provider';
import { UserProvider } from './providers/user-provider/user-provider';
import { UtilProvider} from './providers/utils';
import { HomePage } from './pages/home/home';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, FirebaseRef, AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
//import * as firebase from 'firebase';
import {provideForms, disableDeprecatedForms} from '@angular/forms';



//import { HomePage } from './pages/home/home';


@Component({
  template: '<ion-nav id="nav" [root]="rootPage" #content></ion-nav>',
   

})
export class MyApp {

  message:string;
  rootPage: any;
 

  constructor(public platform: Platform,public authProvider:AuthProvider) 
    {

    	let auth = authProvider.getAuth();
    	auth.onAuthStateChanged( user=> {

    		if(user){
    			//this.rootPage = TabsPage;
          this.rootPage = TabsPage;
    		}
    		else{

    			this.rootPage = LoginPage;
    		}
    });
  }
}

ionicBootstrap(MyApp,

[FIREBASE_PROVIDERS, defaultFirebase({

  apiKey: "AIzaSyCdSM7UqA_mVccvLqX-93bhf5z2cqSMGJY",
	authDomain: "mychatapp-73675.firebaseapp.com",
	databaseURL: "https://mychatapp-73675.firebaseio.com",
	storageBucket: "mychatapp-73675.appspot.com"


}),

firebaseAuthConfig({

	provider: AuthProviders.Password,
	method: AuthMethods.Password,
	remember: 'default',
	scope: ['email']
}),

AuthProvider,
ChatsProvider,
UserProvider,
provideForms(),
disableDeprecatedForms(),
UtilProvider

]



);






