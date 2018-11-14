import { Component, OnInit } from '@angular/core';
import { IonicPage,  NavParams, LoadingController, ViewController, ToastController, ModalController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/user/user';
import { UserForgotPasswordPage } from '../pages';
import { CookieService } from 'ngx-cookie-service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{


  public authForm: FormGroup;
  public loading: any;
  public isLogin:boolean;
  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private cookieService: CookieService,
    public plt: Platform,
    public user: User ) {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      clientType:['1'],
      userType:['0'],
      rememberMe:[true],
      isBind:[true]
    });
  }
  ngOnInit(): void {
    console.log(this.plt.platforms());
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  dismiss() {
    this.viewCtrl.dismiss(this.isLogin);
  }
  forgetPasswordClick(){
    let loginModalPage= this.modalCtrl.create(UserForgotPasswordPage);
   
    loginModalPage.present();
   
  }
  doLogin(formValue) {

    this.loading = this.loadingCtrl.create({
      content: '请稍后...',

      dismissOnPageChange: true
    });
    this.loading.present();
    if(this.plt.is("mobileweb")){
      formValue.clientType=1;
    }
    this.user.auth(formValue).subscribe((res)=>{
      this.isLogin=("true"===res.toString());
      console.log("aa"+this.cookieService.get('sl56Auth'));
      this.loading.dismiss();
      
      if(this.isLogin){
        this.dismiss();
      }
     else{
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
  getCookie(){
    // console.log(this.cookieService.get('OpenId'));
    // console.log(this.cookieService.get('UnionId'));
    // console.log(this.cookieService.get('State'));
    //console.log(this.plt.platforms());
    alert(this.plt.platforms())
  }

}
