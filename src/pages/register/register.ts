import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
// import { CookieService } from 'ngx-cookie-service';
import { RegisterProvider } from '../../providers/register/register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValueNameInfo } from '../../models/valueName.model';
import { CookieService } from 'ngx-cookie-service';
import { UserRechargePage } from '../pages';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public myForm: FormGroup;
  codeText: string = "获取验证码";
  btnDisabled: boolean = false;
  submitDisabled:boolean=false;
  constructor(public navCtrl: NavController,
    private cookieService: CookieService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private dataService: RegisterProvider,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^1[3|4|5|7|8][0-9]{9}$")
      ])],
      code: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]{6}$")
      ])],
    });
  }
  validation_messages = {
    "mobile": [
      { type: "required", message: "手机号码不能为空" },
      { type: "pattern", message: "手机号码格式不正确" }
    ],
    "code": [
      { type: "required", message: "验证码不能为空" },
      { type: "pattern", message: "验证码为6位数字" }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  getCode(formValue) {
    // console.log(this.myForm);
    let openId= this.cookieService.get('OpenId')
    if(openId===""||openId==""||openId==undefined){
      let alert = this.alertCtrl.create({
        title: '请搜索公众号"升蓝国际物流"并关注',
        subTitle: '进入公众号之后使用导航菜单"手机充值->85折充话费"进行充值',
        buttons: ['确定']
      });
      alert.present();
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
      else {
        this.btnDisabled = true;
        this.dataService.getCode(this.myForm.value.mobile).subscribe(res => {
  
          if (res.Success) {
            console.log(res);
            
            let time: number = 60;
  
            let handle;
            setTimeout(() => {
              clearInterval(handle);
              this.codeText = "获取验证码";
              this.btnDisabled = false;
            }, time * 1000);
            handle = setInterval(() => {
              time--;
              this.codeText = time + "秒后重发";
            }, 1000);
          }
          else{
            if(res.Customers.length>0){
              //手机号码查询到一个已注册账号
              if(res.Customers.length==1){
                this.doAlert(res.Customers[0]);
              }
              //多个已注册账号，让用户选择
              else if(res.Customers.length>1){
                this.showRadio(res.Customers);
              }
              
            }
          }
        });
      }
    }
      
  
    
  }
  doAlert(customer:ValueNameInfo) {
    let alert = this.alertCtrl.create({
      title: '您输入的号码已在我公司留存',
      subTitle: '已留存的手机号码可直接进行充值',
      buttons: [{
        text:"确定",
        handler:()=>{
          this.dataService.bindAccount(customer.Id,this.cookieService.get('OpenId'),this.cookieService.get('UnionId')).subscribe(res=>{
            if(res.Success)
              this.navCtrl.push(UserRechargePage);
          });
        }
      }]
    });

    alert.present();
  }
  showRadio(customers:Array<ValueNameInfo>) {
    let alert = this.alertCtrl.create();
    alert.setTitle('你的手机号码已在我公司留存');
    alert.setSubTitle("您在我公司有如下账户，请选择有效账户进行绑定");
    customers.forEach(item=>{
      alert.addInput({
        type: 'radio',
        label: item.Name,
        value: item.Id.toString(),
        checked: false
      });
    });
   

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        this.dataService.bindAccount(data,this.cookieService.get('OpenId'),this.cookieService.get('UnionId')).subscribe(res=>{
          if(res.Success)
            this.navCtrl.push(UserRechargePage);
        });
      }
    });
    alert.present();
  }
  doSubmit(formValue) {
    if (!this.myForm.invalid) {
      console.log(this.myForm.value);
      this.submitDisabled=true;
      this.dataService.doRegister(this.myForm.value.mobile,this.myForm.value.code,this.cookieService.get('OpenId'),this.cookieService.get('UnionId')).subscribe(res=>{
        this.submitDisabled=false;
        if(!res.Success){
          let toast = this.toastCtrl.create({
            message: res.ErrMsg,
            position: 'middle',
            duration: 2000
          });
          toast.present();
        }
        else{
          this.navCtrl.push(UserRechargePage);
        }
      });
    }
    else {
      let errMsg: Array<string> = [];
      this.validation_messages.mobile.forEach(item => {
        if (this.myForm.get('mobile').hasError(item.type))
          errMsg.push(item.message);
      });
      this.validation_messages.code.forEach(item => {
        if (this.myForm.get('code').hasError(item.type))
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
}
