import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPassword } from '../../models/forgot-password.model';
import { User } from '../../providers/user/user';
/**
 * Generated class for the ForgotPassword2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password2',
  templateUrl: 'forgot-password2.html',
})
export class ForgotPassword2Page {
  public myForm: FormGroup;
  data: ForgotPassword;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private service:User,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      newPassword1: ['', Validators.required],
      newPassword2: ['', Validators.required],
    });
    this.data = navParams.get("data");
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassword2Page');
  }
  doNext(formValue) {
    this.data.NewPassword1=this.myForm.value.newPassword1;
    this.data.NewPassword2=this.myForm.value.newPassword2;
    this.service.forgotPassword2(this.data).subscribe(res=>{
      console.log(res);
      if(res.Success){
        let toast = this.toastCtrl.create({
          message: "新密码已成功设置",
          position: 'middle',
          duration: 1000
        });
        toast.present();
        setTimeout(() => {
          this.navCtrl.popToRoot();
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
