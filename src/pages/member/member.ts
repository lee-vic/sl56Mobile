import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ToastController, LoadingController, Platform, Content } from 'ionic-angular';
import { UserCalculationPage, UserRemotePage, UserConfirmationPage, UserDeliveryRecordPage, UserWechatPayPage, UserWechatBindingPage, UserResetPasswordPage, UserPriceListPage, UserTemplateListPage, UserForgotPasswordPage, UserSubAccountPage } from '../pages';
import { User } from '../../providers/user/user';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Menu, Menus, MenuRow } from '../../models/menu.model';
import { UserInfo } from '../../models/userinfo.model';

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

  allMenus:Array<Menu>=[
    { title: "价格查询", image: "assets/imgs/member-2.png", page: UserCalculationPage,type:[0,1] },
    { title: "偏远查询", image: "assets/imgs/member-3.png", page: UserRemotePage,type:[0,1] },
    { title: "运单确认", image: "assets/imgs/member-5.png", page: UserConfirmationPage,type:[0] },
    { title: "交货记录", image: "assets/imgs/member-6.png", page: UserDeliveryRecordPage,type:[0,1] },
    { title: "模板下载", image: "assets/imgs/member-7.png", page: UserTemplateListPage,type:[0,1] },
    { title: "微信支付", image: "assets/imgs/member-8.png", page: UserWechatPayPage,type:[0,1] },
    { title: "查看报价", image: "assets/imgs/member-10.png", page: UserPriceListPage,type:[0] },
    { title: "修改密码", image: "assets/imgs/member-11.png", page: UserResetPasswordPage,type:[0]},
    { title: "账号管理", image: "assets/imgs/member-12.png", page: UserSubAccountPage,type:[0]},
    { title: "微信绑定", image: "assets/imgs/member-13.png", page: UserWechatBindingPage,type:[0,1] }
  ];
  menus:Menus;
  loginModalPage: Modal;
  isLogin: boolean = false;
  username: string = "";
  userInfo: UserInfo;
  public loading: any;
  public authForm: FormGroup;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public service: User,
    public plt: Platform,
    public user: User,
    public formBuilder: FormBuilder,
    private cookieService: CookieService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
      this.authForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        clientType:[],
        userType:['0'],
        rememberMe:[true],
        isBind:[true]
      });
      this.userInfo=new UserInfo();
      this.userInfo.Amount="请稍后...";
      this.userInfo.Quantity1="请稍后...";
      this.userInfo.Quantity2="请稍后...";
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
      if (err.status == 401) {
        this.setLogin(false);
      }
      else if (err.status == 200) {
        this.setLogin(true);
      }
    });
  }
  forgetPasswordClick(){
    let loginModalPage= this.modalCtrl.create(UserForgotPasswordPage);
    loginModalPage.present();
  }
  setUsername() {
    if (this.cookieService.get('Username') != "")
      this.username = this.cookieService.get('Username');
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
      
        this.navCtrl.push(item.page);
    }

  }
  doLogin(formValue) {

    this.loading = this.loadingCtrl.create({
      content: '请稍后...',
    });
    this.loading.present();
    if(this.plt.is("mobileweb")){
      formValue.clientType=1;
    }
    this.user.auth(formValue).subscribe((res)=>{
      this.setLogin("true"===res.toString());
      this.loading.dismiss();
      if(!this.isLogin){
        let toast = this.toastCtrl.create({
          message: '用户名或者密码错误，请重试',
          position: 'middle',
          duration: 1500
        });
        toast.present();
      }
    },(err)=>{
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.message,
        position: 'middle',
        duration: 3000
      });
      toast.present();
    });

  }
  logOff() {
    this.service.logOff().subscribe(res => {
      this.setLogin(false);
    });
  }
 
  getUserInfo() {
   
    this.service.getHomeInfo().subscribe(res => {
      this.userInfo = res;
    });
  }
  ionViewDidEnter() {
    if (this.isLogin) {
      this.getUserInfo();
    }
  }
  setLogin(val:boolean){
    this.isLogin=val;
    if(val){
      this.setUsername();
      this.getUserInfo();
      let customerType=parseInt(this.cookieService.get('CustomerType'));
      if(isNaN(customerType)){
        customerType=0;
      }
    
      let tempMenus=this.allMenus.filter(p=>{
        return p.type.indexOf(customerType)>-1;
      });
      let rowIndex=0;
      this.menus=new Menus();
      this.menus.rows=[];
      for(var i=0;i<tempMenus.length;i++){
        if(i%3==0){
          let newRow=new MenuRow();
          newRow.items=[];
          this.menus.rows.push(newRow);
          if(i>0)
            rowIndex++;
        }
        this.menus.rows[rowIndex].items.push(tempMenus[i]);
      }
    }
    this.content.resize();
  }
}
