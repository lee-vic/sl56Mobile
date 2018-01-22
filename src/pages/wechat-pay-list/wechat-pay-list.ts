import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WechatPayListProvider } from '../../providers/wechat-pay-list/wechat-pay-list';
import { WechatPay } from '../../models/wechat-pay.model';

/**
 * Generated class for the WechatPayListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wechat-pay-list',
  templateUrl: 'wechat-pay-list.html',
})
export class WechatPayListPage implements OnInit {
  items: Array<WechatPay>=[];
  isBusy:boolean=false;
  currentPageIndex: number = 1;
  constructor(public navCtrl: NavController,
    public service: WechatPayListProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
 
  }
  ngOnInit(): void {
    this.getItems(null);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayListPage');
  }
  getItems(infiniteScroll) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList(this.currentPageIndex).subscribe(res => {
      if (res.length < 5&&infiniteScroll != null) {
        infiniteScroll.enable(false);
      }
      for (var i = 0; i < res.length; i++) {
        this.items.push(res[i]);
      }
      this.currentPageIndex++;
      if (infiniteScroll != null)
        infiniteScroll.complete();
      this.isBusy = false;
    });
  }
}
