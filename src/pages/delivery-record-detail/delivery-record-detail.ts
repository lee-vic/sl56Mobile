import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.id=navParams.get("id");
  }
  ngOnInit(): void {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.getDetail(this.id).subscribe(res=>{
      this.data=res;
      loading.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryRecordDetailPage');
  }

}
