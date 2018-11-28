import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Searchbar } from 'ionic-angular';
import { ReturnProvider } from '../../providers/return/return';
import { UserDeliveryRecordDetailPage } from '../pages';

/**
 * Generated class for the ReturnListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-list',
  templateUrl: 'return-list.html',
})
export class ReturnListPage implements OnInit{
  items: Array<any> = [];
  currentPageIndex: number = 1;
  isBusy: boolean = false;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Searchbar) searchbar: Searchbar;
  ngOnInit(): void {
    this.getItems("",false);
  }
  tab="1";
  constructor(public navCtrl: NavController, 
    public service:ReturnProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnListPage');
  }
  scrollItems($event) {
    this.getItems(this.searchbar.value,true);
   
  }
  getItems(key:string,isScroll:boolean) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList1(this.currentPageIndex, key).subscribe(res => {
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
  detail(item) {
    this.navCtrl.push(UserDeliveryRecordDetailPage, {
      id: item.Id
    });
  }

}
