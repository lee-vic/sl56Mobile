import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { WechatPayProvider } from '../../providers/wechat-pay/wechat-pay';
import { UserWechatPayListPage, UserWechatPayDescPage } from '../pages';
import { SignalRConnection, SignalR } from 'ng2-signalr';


declare var WeixinJSBridge: any;
@IonicPage({
  segment: 'wechat-pay/:openId'
})
@Component({
  selector: 'page-wechat-pay',
  templateUrl: 'wechat-pay.html',
})
export class WechatPayPage implements OnInit, OnDestroy {

  data: any = {};
  openId: any;
  allSelected: boolean = true;
  amountInputDisable: boolean = false;
  signalRConnection: SignalRConnection;
  constructor(public navCtrl: NavController,
    public service: WechatPayProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    private signalR: SignalR,
    public navParams: NavParams) {
    this.openId = navParams.get("openId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatPayPage');
  }
  ngOnInit(): void {

    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.signalRConnection = this.signalR.createConnection();
    this.signalRConnection.status.subscribe((p) => console.warn(p.name));
    this.signalRConnection.start().then((c) => {
      let listener = c.listenFor("messageReceived");
      listener.subscribe((msg: any) => {
        let obj = JSON.parse(msg);
        if (obj.Content == "True") {
          this.navCtrl.push(UserWechatPayListPage);
        }
        else {
          let toast1 = this.toastCtrl.create({
            message: "支付失败",
            position: 'middle',
            duration: 1500
          });
          toast1.present();
        }
      });
    });
    this.service.getList(this.openId).subscribe(res => {
      this.data = res;
      if (this.data.ReceiveGoodsDetailList.length > 0) {

        this.amountInputDisable = true;


      }
      else {
        this.amountInputDisable = false;
      }
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



  }
  ngOnDestroy(): void {
    this.signalRConnection.stop();
  }


  onAllClick() {

    this.data.ReceiveGoodsDetailList.forEach(element => {
      element.Selected = this.allSelected;
    });
  }
  selectChange() {
    let selectedAmount: number = 0;
    let selectedList = new Array();
    this.data.ReceiveGoodsDetailList.filter(item => {
      return item.Selected;
    }).forEach(item => {

      selectedAmount = selectedAmount + parseFloat(item.Amount)
      selectedList.push(item.Id);
    });
    console.log(selectedAmount);
    console.log(this.data.Amount1);
    this.data.Amount = (selectedAmount + this.data.Amount1).toFixed(2);
    this.data.SelectIdList = selectedList.toString();
    if (selectedList.length > 0) {
      this.amountInputDisable = true;
      this.data.IsRelease = false;
    }
    else {
      this.amountInputDisable = false;
      this.data.IsRelease = true;
    }
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

      loading.dismiss();
      let jsApiParam = JSON.parse(res.Data);
      this.callpay(jsApiParam);

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
      if (res.Success)
        location.href = res.PayUrl;
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
  callpay(jsApiParam) {
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
      this.jsApiCall(jsApiParam);
    }
  }
  jsApiCall(jsApiParam) {

    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      jsApiParam,//josn串
      (res) => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          let toast = this.toastCtrl.create({
            message: "支付成功",
            position: 'middle',
            duration: 1000
          });
          toast.present();
        }
        else {
          alert(res.err_code + res.err_desc + res.err_msg);
        }
      });
  }
  //val 0:历史欠款模式 1:无历史欠款模式
  showDesc(val) {
    this.navCtrl.push(UserWechatPayDescPage, {
      type: val
    })
  }
}
