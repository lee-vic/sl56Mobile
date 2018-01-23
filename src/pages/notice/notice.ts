import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeProvider } from '../../providers/notice/notice';
import { Notice } from '../../models/notice.model';
import { NoticeDetailPage } from '../pages';

/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage implements OnInit {

  isBusy: boolean = false;
  currentPageIndex: number = 1;
  items: Array<Notice> = [];

  constructor(public navCtrl: NavController,
    private service: NoticeProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getItems(null);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }
  getItems(infiniteScroll) {

    if (this.isBusy)
      return;
    this.isBusy = true;
    this.service.getNoticeList(this.currentPageIndex).subscribe(res => {
      if (res.length <10) {
        infiniteScroll.enable(false);
      }
      else {
        for (var i = 0; i < res.length; i++) {
          this.items.push(res[i]);
        }
        this.currentPageIndex++;
      }
      if (infiniteScroll != null)
        infiniteScroll.complete();
      this.isBusy = false;
    });
  }
  openDetail(item:Notice) {
    this.navCtrl.push(NoticeDetailPage,{id:item.NoticeId});
  }
}
