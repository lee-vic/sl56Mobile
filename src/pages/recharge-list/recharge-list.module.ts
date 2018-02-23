import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargeListPage } from './recharge-list';

@NgModule({
  declarations: [
    RechargeListPage,
  ],
  imports: [
    IonicPageModule.forChild(RechargeListPage),
  ],
})
export class RechargeListPageModule {}
