import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { UserLoginPage, UserCalculationPage, UserRemotePage, UserConfirmationPage, UserDeliveryRecordPage, UserWechatPayPage, UserWechatBindingPage, UserResetPasswordPage, UserPriceListPage } from '../pages';
import { User } from '../../providers/user/user';

/**
 * Generated class for the MemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage implements OnInit {


  menus = [
    {
      rowIndex: 1,
      items: [
        { title: "价格查询", image: "assets/imgs/member-2.png", page: UserCalculationPage },
        { title: "偏远查询", image: "assets/imgs/member-3.png", page: UserRemotePage },
        { title: "交货清单", image: "assets/imgs/member-4.png" }
      ]
    },
    {
      rowIndex: 2,
      items: [
        { title: "运单确认", image: "assets/imgs/member-5.png", page: UserConfirmationPage },
        { title: "交货记录", image: "assets/imgs/member-6.png", page: UserDeliveryRecordPage },
        { title: "模板下载", image: "assets/imgs/member-7.png" }
      ]
    },
    {
      rowIndex: 2,
      items: [
        { title: "微信支付", image: "assets/imgs/member-8.png", page: UserWechatPayPage },
        { title: "我的账单", image: "assets/imgs/member-9.png" },
        { title: "查看报价", image: "assets/imgs/member-10.png",page:UserPriceListPage }
      ]
    },
    {
      rowIndex: 2,
      items: [
        { title: "修改密码", image: "assets/imgs/member-11.png",page: UserResetPasswordPage },
        { title: "账号管理", image: "assets/imgs/member-12.png" },
        { title: "微信绑定", image: "assets/imgs/member-13.png", page: UserWechatBindingPage }
      ]
    }
  ];
  loginModalPage: Modal;
  isLogin: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public service: User,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {

  }
  ngOnInit(): void {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    loading.present();
    this.service.isAuthenticated().subscribe(res => {
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log(err);
      if(err.status==401){
        this.isLogin=false;
      }
      else if(err.status==200){
        this.isLogin=true;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  menuClick(item) {
    if (item.page == undefined) {
      let toast = this.toastCtrl.create({
        message: '开发中...',
        position: 'middle',
        duration: 1500
      });
      toast.present();
    }
    else {
      if (!this.isLogin) {
        this.showLogin(item.page);

      }
      else {
        this.navCtrl.push(item.page);
      }
    }

  }
  loginClick() {
    if(this.isLogin){
      this.service.logOff().subscribe(res=>{
        this.isLogin=false;
        let toast = this.toastCtrl.create({
          message: '已成功退出',
          position: 'middle',
          duration: 1000
        });
        toast.present();
      });
    }
    else{
      this.showLogin(UserCalculationPage);
    }
   
  }
  showLogin(navPage: string) {
    this.loginModalPage = this.modalCtrl.create(UserLoginPage);
    this.loginModalPage.onDidDismiss(data => {
      this.isLogin = data;
      if (this.isLogin)
        this.navCtrl.push(navPage);
    });
    this.loginModalPage.present();
  }
}
