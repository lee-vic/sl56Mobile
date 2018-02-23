import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RechargeProvider } from '../../providers/recharge/recharge';
import { RechargeInfo } from '../../models/recharge.model';

/**
 * Generated class for the RechargeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge-list',
  templateUrl: 'recharge-list.html',
})
export class RechargeListPage  implements OnInit{
  items:Array<RechargeInfo> =new Array<RechargeInfo>();
  ngOnInit(): void {
    this.dataService.getList().subscribe(res=>{
      this.items=res;
     });
  }

  constructor(public navCtrl: NavController,
    private dataService:RechargeProvider,
     public navParams: NavParams) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargeListPage');
  }

}
