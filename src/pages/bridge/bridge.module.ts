import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BridgePage } from './bridge';

@NgModule({
  declarations: [
    BridgePage,
  ],
  imports: [
    IonicPageModule.forChild(BridgePage),
  ],
})
export class BridgePageModule {}
