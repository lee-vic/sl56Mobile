import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculationPage } from './calculation';

@NgModule({
  declarations: [
    CalculationPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculationPage),
  ],
})
export class CalculationPageModule {}
