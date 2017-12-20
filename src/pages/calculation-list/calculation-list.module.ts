import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculationListPage } from './calculation-list';

@NgModule({
  declarations: [
    CalculationListPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculationListPage),
  ],
})
export class CalculationListPageModule {}
