import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryRecordDetailPage } from './delivery-record-detail';


@NgModule({
  declarations: [
    DeliveryRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryRecordDetailPage),
  ]
})
export class DeliveryRecordDetailPageModule {}
