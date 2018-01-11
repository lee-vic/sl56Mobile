import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPassword } from '../../models/reset-Password.model';
import { User } from '../../providers/user/user';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public myForm: FormGroup;
  data:ResetPassword;
  validation_messages={
    "password":[
      {type:"required",message:"原有登录密码不能为空"}
    ],
    "newPassword1":[
      {type:"required",message:"新密码不能为空"},
      {type:"pattern",message:"长度为8-16位并且是字母和数字的组合"}
    ],
    "newPassword2":[
      {type:"required",message:"新密码不能为空"},
      {type:"pattern",message:"长度为8-16位并且是字母和数字的组合"}
    ]
  }
  constructor(public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    private service:User,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword1: ['',Validators.compose([
        Validators.required,
        Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")])],
      newPassword2: ['',Validators.compose([
        Validators.required,
        Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")])],
    });
    this.data=new ResetPassword();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  doNext(formValue) {
    console.log(formValue);
    this.data.NewPassword1=formValue.newPassword1;
    this.data.NewPassword2=formValue.newPassword2;
    this.data.Password=formValue.password;
    this.service.resetPassword(this.data).subscribe(res=>{
      console.log(res);
      if(res.Success){
        let toast = this.toastCtrl.create({
          message: "新密码已成功设置",
          position: 'middle',
          duration: 1000
        });
        toast.present();
        
        setTimeout(() => {
          this.navCtrl.pop();
        }, 1000);
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
