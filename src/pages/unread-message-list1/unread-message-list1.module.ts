import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnreadMessageList1Page } from './unread-message-list1';

@NgModule({
  declarations: [
    UnreadMessageList1Page,
  ],
  imports: [
    IonicPageModule.forChild(UnreadMessageList1Page),
  ],
})
export class UnreadMessageList1PageModule {}
