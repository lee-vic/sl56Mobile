import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PriceProvider } from '../../providers/price/price';
import { PriceInfo } from '../../models/price.model';
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

  currentPageIndex: number = 1;
  items: PriceInfo[] = [];
  isBusy: boolean = false;
  allowDownload:boolean=false;
  downloadUrl:string=apiUrl + "/Price/Download";
  constructor(public navCtrl: NavController,
    private service: PriceProvider,
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
      this.allowDownload=res.AllowDownloadPrice;
      if (res.Items.length < 10&&infiniteScroll!=null) {
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
 

}
