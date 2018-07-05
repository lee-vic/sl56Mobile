import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankSlipsPage } from './bank-slips';

@NgModule({
  declarations: [
    BankSlipsPage,
  ],
  imports: [
    IonicPageModule.forChild(BankSlipsPage),
  ],
})
export class BankSlipsPageModule {}
