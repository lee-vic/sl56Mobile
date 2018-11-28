import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Searchbar } from 'ionic-angular';
import { ProblemProvider } from '../../providers/problem/problem';
import { Problem } from '../../models/problem.model';
import { UserDeliveryRecordDetailPage, UserProblemDetailPage } from '../pages';

/**
 * Generated class for the ProblemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem-list',
  templateUrl: 'problem-list.html',
})
export class ProblemListPage implements OnInit {
  items: Array<Problem> = [];
  currentPageIndex: number = 1;
  isBusy: boolean = false;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Searchbar) searchbar: Searchbar;
  ngOnInit(): void {
    this.getItems("",false);
  }

  constructor(public navCtrl: NavController,
    public service: ProblemProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemListPage');
  }
  detail(item) {
    this.navCtrl.push(UserDeliveryRecordDetailPage, {
      id: item.Id
    });
  }
  problemDetail(_receiveGoodsDetailId,_problemId){
    this.navCtrl.push(UserProblemDetailPage, {
      receiveGoodsDetailId: _receiveGoodsDetailId,
      problemId:_problemId
    });
  }
  searchItems() {
    let val = this.searchbar.value;
    let key = val.trim();
    this.currentPageIndex = 1;
    this.items.length = 0;
    this.getItems(key,false);
  }
  getItems(key:string,isScroll:boolean) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList(this.currentPageIndex, key).subscribe(res => {
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
}
