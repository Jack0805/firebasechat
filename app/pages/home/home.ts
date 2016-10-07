import { Component } from '@angular/core';
import { NavController, LocalStorage, Storage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	local = new Storage(LocalStorage);
  constructor(public nav: NavController, public auth: AuthProvider, public userProvider: UserProvider){

  }


    logout(){
  	this.local.remove('userInfo');
  	this.auth.logout();
  }
}
