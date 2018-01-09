import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeProvider } from '../../providers/notice/notice';
import { Notice } from '../../models/notice.model';
import { NoticeTab } from '../../models/notice-Tab.model';
import { NoticeDetailPage } from '../pages';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage implements OnInit {

  noticeTabs: NoticeTab[] = [
    {
      currentPageIndex: 1,
      categoryId: "2",
      title: "公司通知",
      items: [],
      isBusy: false
    },
    {
      currentPageIndex: 1,
      categoryId: "3",
      title: "业务信息",
      items: [],
      isBusy: false
    },
    {
      currentPageIndex: 1,
      categoryId: "4",
      title: "公司信息",
      items: [],
      isBusy: false
    },
    {
      currentPageIndex: 1,
      categoryId: "5",
      title: "行业信息",
      items: [],
      isBusy: false
    }
  ];
  tab1PageIndex: number = 1;
  tabIndex = "2";
  constructor(public navCtrl: NavController,
    private service: NoticeProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getItems(this.noticeTabs[0], null);
  }
  getItems(tab: NoticeTab, infiniteScroll) {

    if (tab.isBusy)
      return;
    tab.isBusy = true;
    this.service.getList(tab.categoryId, tab.currentPageIndex).subscribe(res => {
      let rep = res as Notice[];
      if (rep.length == 0) {
        infiniteScroll.enable(false);
      }
      else {
        for (var i = 0; i < rep.length; i++) {
          tab.items.push(rep[i]);
        }
        tab.currentPageIndex++;
      }
      if (infiniteScroll != null)
        infiniteScroll.complete();
      tab.isBusy = false;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  openDetail(item:Notice) {
    this.navCtrl.push(NoticeDetailPage,{id:item.NoticeId});
  }
  segmentChanged(ev) {
    
    let findResult = this.noticeTabs.find(item => item.categoryId == ev.value);
    this.selectedTab(findResult);
  }
  selectedTab(tab: NoticeTab) {
  
    this.tabIndex = tab.categoryId;
    if (tab.items.length == 0)
      this.getItems(tab, null);
  }
  ionViewDidEnter() {
    let homeSelected = localStorage.getItem("homeSelectedNews");
    if (homeSelected != null) {
      this.tabIndex = homeSelected;
      localStorage.removeItem("homeSelectedNews");
    }

  }
}
