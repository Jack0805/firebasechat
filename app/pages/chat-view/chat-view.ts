import { Component, ViewChild, AfterContentChecked,AfterViewChecked} from '@angular/core';
import { NavController, NavParams, Content, DateTime} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import * as firebase from 'firebase';
//import {TimeAgoPipe, CalendarPipe, DateFormatPipe} from 'angular2-moment';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, FirebaseRef, AuthProviders, AuthMethods } from 'angularfire2';
/*
  Generated class for the ChatViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chat-view/chat-view.html',

  
})
export class ChatViewPage {

	message:string;
	uid:string;
	interlocutor:string;
  aa:string;
  interlucutoremail:FirebaseObjectObservable<any>;
  uidemail:FirebaseObjectObservable<any>;
	chats:FirebaseListObservable<any>;
	@ViewChild(Content) content: Content;
  myDate: Date;
  date:string;
  
  constructor(public nav: NavController, params: NavParams, public chatsProvider: ChatsProvider, public af: AngularFire, public userProvider: UserProvider) {

      

  		this.uid = params.data.uid;

  		this.interlocutor = params.data.interlocutor;

      //let interlucutoremail = af.database.object('/users/'+this.interlocutor+'/email');

  		chatsProvider.getChatRef(this.uid, this.interlocutor).then((chatRef:any) => {

  				this.chats = this.af.database.list(chatRef);

  		});

      this.interlucutoremail = af.database.object('/users/'+this.interlocutor);
      this.uidemail = af.database.object('/users/'+this.uid);



  }

  ngAfterViewChecked(){
  	this.content.scrollToBottom(100);
  }

 
    

 
  sendMessage(){
    
      this.myDate = new Date();
      this.date = this.myDate.toString();
    
  	if(this.message){
  		let chat = {
  			from:this.uid,
  			message:this.message,
  			type:'message',
        date:this.date
  		};
      
     

  		this.chats.push(chat);

  		this.message = "";
  	}
  };

  sendPicture(){

      this.myDate = new Date();
      this.date = this.myDate.toString();
  	let chat = {from:this.uid, type:'picture',picture:null,date:this.date};

  	this.userProvider.getPicture().then((image) =>{

  		chat.picture = image;
  		this.chats.push(chat);

  	});
  }

}
