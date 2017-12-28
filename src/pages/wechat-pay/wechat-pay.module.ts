import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WechatPayPage } from './wechat-pay';


@NgModule({
  declarations: [
    WechatPayPage,
  ],
  imports: [
    IonicPageModule.forChild(WechatPayPage),
  ]
})
export class WechatPayPageModule {}
