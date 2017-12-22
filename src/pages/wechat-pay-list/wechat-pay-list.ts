import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WechatPayListProvider } from '../../providers/wechat-pay-list/wechat-pay-list';

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
  list: any;
  startDate: string;
  endDate: string;
  constructor(public navCtrl: NavController,
    public service: WechatPayListProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    let now = new Date();
    this.endDate = now.toISOString();
    this.startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
  }
  ngOnInit(): void {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.getList(this.startDate, this.endDate).subscribe(res => {
      this.list = res;
      loading.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayListPage');
  }

}
