import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InstantMessageProvider } from '../../providers/instant-message/instant-message';
import { UserChatPage } from '../pages';

/**
 * Generated class for the UnreadMessageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unread-message-list',
  templateUrl: 'unread-message-list.html',
})
export class UnreadMessageListPage implements OnInit{
  data:any={};
  ngOnInit(): void {
    this.service.getUnReadMessage().subscribe(res=>{
      this.data=res;
      console.log(this.data);
    });
  }

  constructor(public navCtrl: NavController,
    public service:InstantMessageProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnreadMessageListPage');
  }
  detail(type){
    if(type==0){
      this.navCtrl.push(UserChatPage,{
        messageType:0
      });
    }
  }

}
