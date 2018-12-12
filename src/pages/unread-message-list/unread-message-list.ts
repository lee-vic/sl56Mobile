import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InstantMessageProvider } from '../../providers/instant-message/instant-message';
import { UserChatPage, UserUnreadMessageList1Page } from '../pages';

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
   
  }
  getData(){
    this.service.getUnReadMessage().subscribe(res=>{
      this.data=res;
     
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
    else{
      this.navCtrl.push(UserUnreadMessageList1Page)
    }
  }
  ionViewDidEnter() {
   this.getData();
  }

}
