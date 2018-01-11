import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceListPage } from './price-list';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    PriceListPage,
  ],
  imports: [
    IonicPageModule.forChild(PriceListPage),
  ],
  providers:[
    File,
    FileTransfer
  ]
})
export class PriceListPageModule {}
