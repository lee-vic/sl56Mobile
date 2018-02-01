import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CookieService } from 'ngx-cookie-service';
import { RechargeProvider } from '../../providers/recharge/recharge';

/**
 * Generated class for the RechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var jQuery: any;
declare var WeixinJSBridge: any;

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage implements OnInit,OnDestroy {
 
  selectedAmount:number=0;
  charge:string;
  data: any;
  constructor(public navCtrl: NavController,
     private cookieService: CookieService,
     public loadingCtrl: LoadingController,
     public dataService:RechargeProvider,
     public toastCtrl: ToastController,
     public navParams: NavParams) {
  }
  ngOnInit(): void {
    jQuery.connection.hub.url = "https://signalr.sl56.com/signalr";
    var hub = jQuery.connection.messageHub;
    hub.client.messageReceived = this.success.bind(this);
    jQuery.connection.hub.start({ xdomain: true }).done(function () {
      console.log('Now connected, connection ID=' + jQuery.connection.hub.id);
    });
  }
  ngOnDestroy(): void {
    jQuery.connection.hub.stop();
  }
  success(msg) {
    let obj=JSON.parse(msg);
    if(obj.Content=="True"){
      // this.navCtrl.push(UserWechatPayListPage);
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
  }
  amountSelected(amount){
    this.selectedAmount=parseInt(amount) ;
    this.charge=(this.selectedAmount*0.85).toFixed(2) ;
  }
  getCode(){
    console.log("getCode");
  }
  doSubmit(){
    // console.log(this.cookieService.get('OpenId'));
    // console.log(this.cookieService.get('UnionId'));
    // console.log(this.cookieService.get('State'));
    // console.log(this.cookieService.get('Username'));
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
    this.dataService.pay(this.data).subscribe(res => {
      
      loading.dismiss();
      let jsApiParam=JSON.parse(res.Data) ;
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
    this.dataService.pay(this.data).subscribe(res => {
      console.log(res);
      loading.dismiss();
      if(res.Success)
      location.href=res.PayUrl;
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
}
