import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Alert, AlertController, LoadingController, LocalStorage, Storage } from 'ionic-angular';
import { AuthProvider } from '../providers/auth-provider/auth-provider';


/*
  Generated class for the UtilProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilProvider {

local = new Storage(LocalStorage);
constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,public auth:AuthProvider){}

  doAlert(title, message,buttonText){
  	console.log(message);

  	let alert = this.alertCtrl.create({

  		title:title,
  		subTitle:message,
  		buttons:[buttonText]

  	});

  	return alert;

  }

  presentLoading() {

    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      //duration:1000,
      dismissOnPageChange: true
    });
     
     return loading;
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'You sure to leave us?',
      message: 'If you log out you will need to use the email and password to perform login action again',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.local.remove('userInfo');
            this.auth.logout();
          }
        }
      ]
    });
    //confirm.present();
    return confirm;
  }

}

