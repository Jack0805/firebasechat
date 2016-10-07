import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user-provider/user-provider';
import {ChatViewPage} from '../chat-view/chat-view';
import { LoginPage } from '../login/login';
import { UtilProvider } from '../../providers/utils';
import { FirebaseRef, AngularFire, FirebaseListObservable } from 'angularfire2';
//import { OnInit } from '@angular/core';



/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',
})
export class UsersPage {

	//users: Observable<any[]>;

  users: FirebaseListObservable<any>;
	uid:string;
  searchQuery: string = '';
  items: string[] = [];
  count: any = 0;
  //email: any;

  constructor(public nav: NavController, public userProvider: UserProvider, public af: AngularFire, public util: UtilProvider) {

       
        this.initializeItems();
  		  userProvider.getUid().then(uid => {

  			this.uid = uid;
  			this.users = this.userProvider.getAllUsers();


  		});


  }

 

  openChat(key){
 
  	let param = {uid:this.uid, interlocutor: key};

  	this.nav.push(ChatViewPage, param);
  }



  getItems(ev:any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }



}

  initializeItems() { // tring to implement a search funtion later
    //var items = [100];
    this.af.database.list('/users', { preserveSnapshot: true})
    .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {

          this.items[this.count] = snapshot.val().email;
          //console.log(snapshot.key, snapshot.val().email);
          //console.log(this.items[this.count]);
          this.count++;
        });
    })
    
}


}
