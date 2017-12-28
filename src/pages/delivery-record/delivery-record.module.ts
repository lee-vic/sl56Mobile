import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryRecordPage } from './delivery-record';

@NgModule({
  declarations: [
    DeliveryRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryRecordPage),
  ]
})
export class DeliveryRecordPageModule {}
