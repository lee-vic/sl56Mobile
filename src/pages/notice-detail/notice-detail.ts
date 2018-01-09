import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeProvider } from '../../providers/notice/notice';
import { Notice } from '../../models/notice.model';

/**
 * Generated class for the NoticeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice-detail',
  templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage implements OnInit  {
  id:number;
  notice:Notice;
  ngOnInit(): void {
    this.service.getDetail(this.id).subscribe(res=>{
      this.notice=res;
    });
  }

  constructor(public navCtrl: NavController, 
    private service:NoticeProvider,
    public navParams: NavParams) {
      this.id=navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeDetailPage');
  }

}
