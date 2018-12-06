import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DeliveryRecordDetailProvider } from '../../providers/delivery-record-detail/delivery-record-detail';
import { UserReturnApplyPage } from '../pages';

/**
 * Generated class for the DeliveryRecordDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'delivery-record-detail/:id'
})
@Component({
  selector: 'page-delivery-record-detail',
  templateUrl: 'delivery-record-detail.html',
})
export class DeliveryRecordDetailPage implements OnInit {
  data:any;
  id:any;
  tab="1";
  isReturn=true;
  constructor(public navCtrl: NavController, 
    public service:DeliveryRecordDetailProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
      this.id=navParams.get("id");
  }
  ngOnInit(): void {
    //不能返回的视为站外链接
   let canGoBack:boolean=this.navCtrl.canGoBack();
    this.service.getDetail(!canGoBack, this.id).subscribe(res=>{
      this.data=res;
     this.isReturn=this.data.IsReturnCustomer;
    },(err)=>{
     
      let toast = this.toastCtrl.create({
        message: err.message,
        position: 'middle',
        duration: 2000
      });
      toast.present();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryRecordDetailPage');
  }
  applyReturn(){
    this.navCtrl.push(UserReturnApplyPage, {
      id: this.id,
      type:0
    });
  }

}
