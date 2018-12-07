import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnreadMessageListPage } from './unread-message-list';

@NgModule({
  declarations: [
    UnreadMessageListPage,
  ],
  imports: [
    IonicPageModule.forChild(UnreadMessageListPage),
  ],
})
export class UnreadMessageListPageModule {}
