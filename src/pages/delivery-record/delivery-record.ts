import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, InfiniteScroll, Searchbar } from 'ionic-angular';
import { DeliveryRecordProvider } from '../../providers/delivery-record/delivery-record';
import { deliveryRecord } from '../../models/delivery-record.model';
import { UserDeliveryRecordDetailPage } from '../pages';


/**
 * Generated class for the DeliveryRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery-record',
  templateUrl: 'delivery-record.html',
})
export class DeliveryRecordPage implements OnInit {

  items: Array<deliveryRecord> = [];
  currentPageIndex: number = 1;
  isBusy: boolean = false;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Searchbar) searchbar: Searchbar;



  constructor(public navCtrl: NavController,
    public service: DeliveryRecordProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getItems("",false);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryRecordPage');
  }
  searchItems() {
    let val = this.searchbar.value;
    let key = val.trim();
    this.currentPageIndex = 1;
    this.items.length = 0;
    this.getItems(key,false);
  }

  //加载数据
  getItems(key:string,isScroll:boolean) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.loadList(this.currentPageIndex, key).subscribe(res => {
      let flag = res.length < 10;
      this.infiniteScroll.enable(!flag);
      for (var i = 0; i < res.length; i++) {
        this.items.push(res[i]);
      }
      this.currentPageIndex++;
      if(isScroll)
        this.infiniteScroll.complete();
      this.isBusy = false;
    });
  }
  scrollItems($event) {
    this.getItems(this.searchbar.value,true);
   
  }

  detail(item) {
    this.navCtrl.push(UserDeliveryRecordDetailPage, {
      id: item.Id
    });
  }
}
