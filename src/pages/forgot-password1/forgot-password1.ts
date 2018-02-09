import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../providers/user/user';
import { ForgotPassword } from '../../models/forgot-password.model';
import { UserForgotPassword2Page } from '../pages';

/**
 * Generated class for the ForgotPassword1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password1',
  templateUrl: 'forgot-password1.html',
})
export class ForgotPassword1Page {
  public myForm: FormGroup;
  data:ForgotPassword;
  codeText:string="获取验证码";
  btnDisabled: boolean = false;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private service:User,
    public toastCtrl: ToastController,
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
    this.data=navParams.get("data");
    console.log(this.data);
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
    console.log('ionViewDidLoad ForgotPassword1Page');
  }
  getCode(event){
    event.preventDefault();

    this.data.Mobile=this.myForm.value.mobile;
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
    else{
      this.btnDisabled = true;
      this.service.getCode(this.data).subscribe(res=>{
        if(res.Success){
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
          let toast = this.toastCtrl.create({
            message: res.ErrMsg,
            position: 'middle',
            duration: 3000
          });
          toast.present();
          this.btnDisabled = false;
        }
      });
    }
 
 
  }
  doSubmit(formValue){
    this.data.Mobile=this.myForm.value.mobile;
    this.data.Code=this.myForm.value.code;
    this.service.forgotPassword1(this.data).subscribe(res=>{
      console.log(res);
      if(res.Success){
        this.navCtrl.push(UserForgotPassword2Page,{data:res});
      }
      else{
        let toast = this.toastCtrl.create({
          message: res.ErrMsg,
          position: 'middle',
          duration: 3000
        });
        toast.present();
      }
    });
  }
}
