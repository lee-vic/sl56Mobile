import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WechatPayProvider } from '../../providers/wechat-pay/wechat-pay';

/**
 * Generated class for the WechatPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wechat-pay',
  templateUrl: 'wechat-pay.html',
})
export class WechatPayPage implements OnInit, OnDestroy {
  data: any;
  allSelected: boolean = true;
  constructor(public navCtrl: NavController,
    public service: WechatPayProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayPage');
  }
  ngOnInit(): void {
    document.querySelector(".tabbar")['style'].display = 'none';
    let loading = this.loadingCtrl.create({
      content: '请稍后...',

      dismissOnPageChange: true
    });
    loading.present();
    this.service.getList().subscribe(res => {
      this.data = res;
      loading.dismiss();
    });
  }
  ngOnDestroy(): void {
    document.querySelector(".tabbar")['style'].display = 'flex';
  }
  onAllClick() {

    this.data.ReceiveGoodsDetailList.forEach(element => {
      element.Selected = this.allSelected;
    });
  }
  selectChange() {
    let totalAmount: number = 0;
    let selectedItems = this.data.ReceiveGoodsDetailList.filter(item => {
      return item.Selected;
    }).forEach(item => {

      totalAmount = totalAmount + parseFloat(item.Amount)
    });
    this.data.Amount = totalAmount.toFixed(2);
    this.calculateAmount();
  }
  amountChange() {
    this.calculateAmount();

  }
  calculateAmount() {
    let tempAmount: number = 0;
    if (this.data.Amount != "")
      tempAmount =parseFloat(this.data.Amount) ;
    if (this.data.WXPaymentCommission) {
      this.data.Commission = (tempAmount * 3 / 997).toFixed(2);
    }
    else {
      this.data.Commission = 0;
    }
    this.data.TotalAmount = (tempAmount + parseFloat(this.data.Commission)).toFixed(2);
  }
}
