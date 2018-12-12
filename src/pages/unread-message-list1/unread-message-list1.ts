import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InstantMessageProvider } from '../../providers/instant-message/instant-message';
import { UserChatPage } from '../pages';

/**
 * Generated class for the UnreadMessageList1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unread-message-list1',
  templateUrl: 'unread-message-list1.html',
})
export class UnreadMessageList1Page implements OnInit {
  items:Array<any>=[];
  ngOnInit(): void {
  
  }
  getData(){
    this.service.getMessages1().subscribe(res=>{
      this.items=res;
      console.log(this.items);
    });
  }
  constructor(public navCtrl: NavController, 
    public service:InstantMessageProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnreadMessageList1Page');
  }
  detail(item){
    this.navCtrl.push(UserChatPage, {
      receiveGoodsDetailId: item.ReceiveGoodsDetailId,
      messageType:1
    });
  }
  ionViewDidEnter() {
    this.getData();
   }
}
