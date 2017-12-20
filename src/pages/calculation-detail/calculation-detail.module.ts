import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculationDetailPage } from './calculation-detail';

@NgModule({
  declarations: [
    CalculationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculationDetailPage),
  ],
})
export class CalculationDetailPageModule {}
