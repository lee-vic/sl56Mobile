import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WechatBindingPage } from './wechat-binding';

@NgModule({
  declarations: [
    WechatBindingPage,
  ],
  imports: [
    IonicPageModule.forChild(WechatBindingPage),
  ],
})
export class WechatBindingPageModule {}
