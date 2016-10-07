import { Component } from '@angular/core';
import { NavController, LocalStorage, Storage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';

/*
  Generated class for the AccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {

	rootNav;
	user = {};
	local = new Storage(LocalStorage);


  constructor(public nav: NavController, public auth: AuthProvider, public userProvider: UserProvider, public util:UtilProvider) {

  		this.userProvider.getUser().then(userObservable =>{

  			userObservable.subscribe(user =>{

  				this.user = user;

  			});

  		});


      

  }

  updatePicture(){

  	this.userProvider.updatePicture();
  };

  logout(){

    let sure = this.util.showConfirm();
    sure.present();
  	//this.local.remove('userInfo');
  	//this.auth.logout();
  }

}
