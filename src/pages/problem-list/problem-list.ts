import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProblemProvider } from '../../providers/problem/problem';
import { Problem } from '../../models/problem.model';
import { UserDeliveryRecordDetailPage } from '../pages';

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
  ngOnInit(): void {
    this.service.getList().subscribe(res => {
      this.items = res;
    })
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
  problemDetail(receiveGoodsDetailId,problemId){
    
  }
}
