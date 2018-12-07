import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProblemProvider } from '../../providers/problem/problem';
import { UserChatPage } from '../pages';


/**
 * Generated class for the ProblemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem-detail',
  templateUrl: 'problem-detail.html',
})
export class ProblemDetailPage implements OnInit{
  receiveGoodsDetailId:Number;
  problemId:Number;
  data:any;
  ngOnInit(): void {
    this.service.getProblemDetail(this.receiveGoodsDetailId,this.problemId).subscribe(res => {
      this.data=res;
    });
  }

  constructor(public navCtrl: NavController,
    public service: ProblemProvider,
    public navParams: NavParams) {
      this.receiveGoodsDetailId=navParams.get("receiveGoodsDetailId");
      this.problemId=navParams.get("problemId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemDetailPage');
  }

  chat(){
    this.navCtrl.push(UserChatPage, {
      model: this.data,
    });
  }
}