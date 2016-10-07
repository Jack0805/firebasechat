import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import {ChatViewPage} from '../chat-view/chat-view';


/*
  Generated class for the ChatsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chats/chats.html',
})
export class ChatsPage {

	chats:Observable<any[]>;

  constructor(public chatsProvider: ChatsProvider, public userProvider: UserProvider, public af: AngularFire, private nav: NavController) {

  		this.chatsProvider.getChats().then(chats => {

  			this.chats = chats.map( users =>{

  				return users.map( user =>{

  					//user.info = this.af.database.object('/users/${user.$key}');
            user.info = this.af.database.object('/users/'+user.$key); 

  					return user;

  				});

  			});

  		});

      //console.log(this.af.database.list('/users'));

  }

  openChat(key){

  	this.userProvider.getUid().then(uid=>{

  		let param = {uid:uid, interlocutor: key};

  		this.nav.push(ChatViewPage, param);
  	});
  }

}
