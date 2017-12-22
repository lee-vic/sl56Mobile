import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WechatPayListPage } from './wechat-pay-list';

@NgModule({
  declarations: [
    WechatPayListPage,
  ],
  imports: [
    IonicPageModule.forChild(WechatPayListPage),
  ],
})
export class WechatPayListPageModule {}
