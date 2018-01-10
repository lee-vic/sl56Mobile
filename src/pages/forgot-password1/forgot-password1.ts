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
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private service:User,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      mobile: ['', Validators.required],
      code: ['', Validators.required],
    });
    this.data=navParams.get("data");
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassword1Page');
  }
  getCode(event){
    event.preventDefault();
    this.data.Mobile=this.myForm.value.mobile;
    this.service.getCode(this.data).subscribe(res=>{
      if(res.Success){
       
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
  doNext(formValue){
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