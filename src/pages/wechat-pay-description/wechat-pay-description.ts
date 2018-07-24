import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WechatPayDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wechat-pay-description',
  templateUrl: 'wechat-pay-description.html',
})
export class WechatPayDescriptionPage {
  type:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type=navParams.get("type");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayDescriptionPage');
  }

}
