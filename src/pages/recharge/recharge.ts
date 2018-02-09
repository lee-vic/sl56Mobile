import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { CookieService } from 'ngx-cookie-service';
import { RechargeProvider } from '../../providers/recharge/recharge';
import { RechargeInfo } from '../../models/recharge.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRechargeAgreementPage } from '../pages';

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
export class RechargePage implements OnInit, OnDestroy {
  public myForm: FormGroup;
  selectedAmount: number = 0;
  charge: string;
  para: RechargeInfo = new RechargeInfo();
  rows=[
    [
      {amount:10,discount:0.85,desc:"85折"},
      {amount:20,discount:0.85,desc:"85折"},
      {amount:30,discount:0.85,desc:"85折"}
    ],
    [
      {amount:50,discount:0.85,desc:"85折"},
      {amount:100,discount:0.85,desc:"85折"},
      {amount:200,discount:0.9,desc:"9折"}
    ],
    [
      {amount:300,discount:0.9,desc:"9折"},
      {amount:400,discount:0.9,desc:"9折"},
      {amount:500,discount:0.9,desc:"9折"}
    ]
  ]
  constructor(public navCtrl: NavController,
    private cookieService: CookieService,
    public loadingCtrl: LoadingController,
    public dataService: RechargeProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^1[3|4|5|7|8][0-9]{9}$")
      ])]
    });
  }
  validation_messages = {
    "mobile": [
      { type: "required", message: "手机号码不能为空" },
      { type: "pattern", message: "手机号码格式不正确" }
    ]
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
    let obj = JSON.parse(msg);
    if (obj.Content == "True") {
      // this.navCtrl.push(UserWechatPayListPage);
    }
    else {
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
  amountSelected(item) {
    this.selectedAmount = parseInt(item.amount);
    this.charge = (this.selectedAmount * item.discount).toFixed(2);
  }
  getCode() {
    console.log("getCode");
  }
  doSubmit() {
    // console.log(this.cookieService.get('OpenId'));
    // console.log(this.cookieService.get('UnionId'));
    // console.log(this.cookieService.get('State'));
    // console.log(this.cookieService.get('Username'));
    //微信浏览器
    if (!this.myForm.invalid) {
      if (this.selectedAmount == 0) {
        let toast = this.toastCtrl.create({
          message: "请选择充值金额",
          position: 'middle',
          duration: 2000
        });
        toast.present();
      }
      else {
        this.para.Amount = this.selectedAmount;
        this.para.OpenId = this.cookieService.get('OpenId');
        this.para.Mobile = this.myForm.value.mobile;
        this.para.NNKType="10000"
        console.log(this.para);
        if (this.IsMicroMessenger()) {
          this.payByJsApi();
        }
        else {
          this.payByH5();
        }
        
      }

    }
    else{
      let errMsg: Array<string> = [];
      this.validation_messages.mobile.forEach(item => {
        if (this.myForm.get('mobile').hasError(item.type))
          errMsg.push(item.message);
      });
      if (errMsg.length > 0) {
        let toast = this.toastCtrl.create({
          message: errMsg.toString(),
          position: 'middle',
          duration: 2000
        });
        toast.present();
      }
    }

  }
  payByJsApi() {
    this.para.TradeType = "JSAPI";
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.dataService.pay(this.para).subscribe(res => {

      loading.dismiss();
      if(res.Success){
        let jsApiParam = JSON.parse(res.Data);
        this.callpay(jsApiParam);
      }
      else{
        let toast = this.toastCtrl.create({
          message: res.ErrMsg,
          position: 'middle',
          duration: 3000
        });
  
        toast.present();
      }

      

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
    this.para.TradeType = "MWEB";
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.dataService.pay(this.para).subscribe(res => {
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
          let alert = this.alertCtrl.create({
            title: '恭喜你成功充值'+this.selectedAmount+"元",
            subTitle: "进入会员中心快速查报价、跟踪单号轨迹",
            buttons: [
              {
                text: '暂时不用了',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: '进入会员中心',
                handler: () => {
                  this.navCtrl.setRoot("MemberPage");
                }
              }
            ]
          });
      
          alert.present();
        }
        else {
          alert(res.err_code + res.err_desc + res.err_msg);
        }
      });
  }
  openAgreement(){
    this.navCtrl.push(UserRechargeAgreementPage);
  }
}
