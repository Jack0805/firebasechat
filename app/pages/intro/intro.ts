import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {

	slideOptions: any;	

	constructor(public nav: NavController){
		this.slideOptions = {
			pager: true
		};
	}

	goToHome(): void {
	this.nav.setRoot(LoginPage);
	}
}