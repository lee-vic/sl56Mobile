import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { WechatPayProvider } from '../../providers/wechat-pay/wechat-pay';
import { UserWechatPayListPage, UserWechatPayConfirmPage } from '../pages';

/**
 * Generated class for the WechatPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var jQuery: any;

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
    public toastCtrl: ToastController,
  
    public popoverCtrl: PopoverController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayPage');
  }
  ngOnInit(): void {
    document.querySelector(".tabbar")['style'].display = 'none';
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.getList().subscribe(res => {
      this.data = res;
      loading.dismiss();
    });
    jQuery.connection.hub.url = "http://signalr.sl56.com/signalr";
    var hub =jQuery.connection.messageHub;
    hub.client.waitNotify=this.success.bind(this);
    jQuery.connection.hub.start({ xdomain: true }).done(function () {
      console.log('Now connected, connection ID=' + jQuery.connection.hub.id);
    });
  }
  
  success(msg){
    console.log(msg);
    this.navCtrl.push(UserWechatPayListPage);
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
  payClick(){
    
  
    // let loading = this.loadingCtrl.create({
    //   content: '请稍后...'
    // });
    // loading.present();
    // this.service.pay(this.data).subscribe(res=>{
    //   console.log(res);
    //   loading.dismiss();
     
    //   window.location.href=res.toString();
    // },(err)=>{
    //   loading.dismiss();
    //   let toast = this.toastCtrl.create({
    //     message: err.message,
    //     position: 'middle',
    //     duration: 3000
    //   });

    //   toast.present();
    // });
  }
  listClick(){
    this.navCtrl.push(UserWechatPayListPage);
  }
}
