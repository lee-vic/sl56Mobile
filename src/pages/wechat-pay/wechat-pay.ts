import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, PopoverController, ViewController } from 'ionic-angular';
import { WechatPayProvider } from '../../providers/wechat-pay/wechat-pay';
import { UserWechatPayListPage } from '../pages';
import { CookieService } from 'ngx-cookie-service';


declare var jQuery: any;
declare var WeixinJSBridge: any;

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
    public viewCtrl: ViewController,
    private cookieService: CookieService,
    public popoverCtrl: PopoverController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayPage');
  }
  ngOnInit(): void {
    let tabbar = document.querySelector(".tabbar");
    if (tabbar != undefined) {
      tabbar['style'].display = 'none';
    }
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.getList().subscribe(res => {
      this.data = res;
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: error.statusText,
        position: 'middle',
        duration: 1500
      });
      toast.present();
    });
    if (this.cookieService.get('State') != "")
      this.viewCtrl.showBackButton(false);
    jQuery.connection.hub.url = "http://signalr.sl56.com/signalr";
    var hub = jQuery.connection.messageHub;
    hub.client.messageReceived = this.success.bind(this);
    jQuery.connection.hub.start({ xdomain: true }).done(function () {
      console.log('Now connected, connection ID=' + jQuery.connection.hub.id);
    });
  }
  ngOnDestroy(): void {
    let tabbar = document.querySelector(".tabbar");
    if (tabbar != undefined) {
      tabbar['style'].display = 'flex';
    }

  }
  success(msg) {
    let obj=JSON.parse(msg);
    if(obj.Content=="True"){
      this.navCtrl.push(UserWechatPayListPage);
    }
    else{
      let toast1 = this.toastCtrl.create({
        message: "支付失败",
        position: 'middle',
        duration: 1500
      });
      toast1.present();
    }
  }

  onAllClick() {

    this.data.ReceiveGoodsDetailList.forEach(element => {
      element.Selected = this.allSelected;
    });
  }
  selectChange() {
    let totalAmount: number = 0;
    this.data.ReceiveGoodsDetailList.filter(item => {
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
      tempAmount = parseFloat(this.data.Amount);
    if (this.data.WXPaymentCommission) {
      this.data.Commission = (tempAmount * 3 / 997).toFixed(2);
    }
    else {
      this.data.Commission = 0;
    }
    this.data.TotalAmount = (tempAmount + parseFloat(this.data.Commission)).toFixed(2);
  }
  payClick() {
    //微信浏览器
    if (this.IsMicroMessenger()) {
      this.payByJsApi();
    }
    else {
      this.payByH5();
    }
  }
  payByJsApi() {
    this.data.TradeType = "JSAPI";
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.pay(this.data).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.callpay(res);
     
    }, (err) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.message,
        position: 'middle',
        duration: 3000
      });

      toast.present();
    });
  }
  payByH5() {
    this.data.TradeType = "MWEB";
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.pay(this.data).subscribe(res => {
      console.log(res);
      loading.dismiss();
      if(res.Success)
        window.location.href = res.PayUrl;
    }, (err) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.message,
        position: 'middle',
        duration: 3000
      });

      toast.present();
    });
  }


  IsMicroMessenger(): boolean {
    let ua = navigator.userAgent.toLowerCase();
    let m = ua.match(/MicroMessenger/i);

    if (m != null && m.toString() == "micromessenger") {
      return true;
    }
    return false;
  }

  listClick() {
    this.navCtrl.push(UserWechatPayListPage);
  }
  callpay(order) {
    if (typeof WeixinJSBridge == "undefined") {
      console.log("undefined");
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
      }

      // else if (document.attachEvent) {
      //   document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
      //   document.attachEvent('onWeixinJSBridgeReady',this.jsApiCall);
      // }
    }
    else {
      console.log("jsApiCall");
      this.jsApiCall(order);
    }
  }
  jsApiCall(order) {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      order,//josn串
      (res) => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          alert("已成功支付");
          window.location.href = "/DelivervRecord/Index";
        }
        else {
          alert(res.err_code + res.err_desc + res.err_msg);
        }
      });
  }
}
