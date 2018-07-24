import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WechatPayDescriptionPage } from './wechat-pay-description';

@NgModule({
  declarations: [
    WechatPayDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(WechatPayDescriptionPage),
  ],
})
export class WechatPayDescriptionPageModule {}
