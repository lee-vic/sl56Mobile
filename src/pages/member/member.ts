import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { UserLoginPage, UserCalculationPage, UserRemotePage, UserConfirmationPage, UserDeliveryRecordPage, UserWechatPayPage } from '../pages';

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
export class MemberPage {

  menus = [
    {
      rowIndex: 1,
      items: [
        { title: "资费计算", image: "assets/imgs/member-2.png",page:UserCalculationPage },
        { title: "偏远查询", image: "assets/imgs/member-3.png",page:UserRemotePage },
        { title: "交货清单", image: "assets/imgs/member-4.png"}
      ]
    },
    {
      rowIndex: 2,
      items: [
        { title: "运单确认", image: "assets/imgs/member-5.png",page:UserConfirmationPage },
        { title: "交货记录", image: "assets/imgs/member-6.png",page:UserDeliveryRecordPage },
        { title: "模板下载", image: "assets/imgs/member-7.png" }
      ]
    },
    {
      rowIndex: 2,
      items: [
        { title: "微信支付", image: "assets/imgs/member-8.png",page:UserWechatPayPage },
        { title: "我的账单", image: "assets/imgs/member-9.png" },
        { title: "查看报价", image: "assets/imgs/member-10.png"}
      ]
    },
    {
      rowIndex: 2,
      items: [
        { title: "修改密码", image: "assets/imgs/member-11.png" },
        { title: "子账号管理", image: "assets/imgs/member-12.png" },
        { title: "微信绑定", image: "assets/imgs/member-13.png" }
      ]
    }
  ];
  loginModalPage:Modal;
  isLogin:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  menuClick(item){
    if(!this.isLogin){
      this.showLogin(item.page);
    
    }
    else{
      this.navCtrl.push(item.page);
    }
  }
  loginClick(){
    
    this.showLogin(UserCalculationPage);
  }
  showLogin(navPage:string){
    this.loginModalPage= this.modalCtrl.create(UserLoginPage);
    this.loginModalPage.onDidDismiss(data=>{
       this.isLogin=data;
       if(this.isLogin)
        this.navCtrl.push(navPage);
    });
    this.loginModalPage.present();
  }
}
