import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PriceProvider } from '../../providers/price/price';
import { PriceInfo } from '../../models/price.model';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { apiUrl } from '../../globals';
/**
 * Generated class for the PriceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-price-list',
  templateUrl: 'price-list.html',
})
export class PriceListPage implements OnInit {
  fileTransfer: FileTransferObject = this.transfer.create();
  currentPageIndex: number = 1;
  items: PriceInfo[] = [];
  isBusy: boolean = false;
  constructor(public navCtrl: NavController,
    private service: PriceProvider,
    private transfer: FileTransfer, private file: File,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getItems(null);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceListPage');
  }
  getItems(infiniteScroll) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList(this.currentPageIndex).subscribe(res => {
      if (res.Items.length < 10) {
        infiniteScroll.enable(false);
      }
      for (var i = 0; i < res.Items.length; i++) {
        this.items.push(res.Items[i]);
      }
      this.currentPageIndex++;
      if (infiniteScroll != null)
        infiniteScroll.complete();
      this.isBusy = false;
    });
  }
  download(){
    console.log("download");
    const url = apiUrl + "/Price/Download"
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log("download error");
    });
  }

}
