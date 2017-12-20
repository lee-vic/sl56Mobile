import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeliveryRecordDetailProvider } from '../../providers/delivery-record-detail/delivery-record-detail';

/**
 * Generated class for the DeliveryRecordDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery-record-detail',
  templateUrl: 'delivery-record-detail.html',
})
export class DeliveryRecordDetailPage implements OnInit {
  data:any;
  id:any;
  tab="1";
  constructor(public navCtrl: NavController, 
    public service:DeliveryRecordDetailProvider,
    public navParams: NavParams) {
      this.id=navParams.get("id");
  }
  ngOnInit(): void {
    this.service.getDetail(this.id).subscribe(res=>{
      this.data=res;
      console.log(this.data);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryRecordDetailPage');
  }

}
