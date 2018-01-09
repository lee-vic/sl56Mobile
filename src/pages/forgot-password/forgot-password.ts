import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../providers/user/user';
import { UserForgotPassword1Page } from '../pages';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public myForm: FormGroup;
  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private service:User,
    public navParams: NavParams) {
      this.myForm = this.formBuilder.group({
        username: ['', Validators.required],
      
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  doNext(formValue){
    this.service.forgotPassword(formValue.username).subscribe(res=>{
     
      if(res.Exists){
        this.navCtrl.push(UserForgotPassword1Page,{data:res});
      }
      else{
        let toast = this.toastCtrl.create({
          message: '你输入的账号不存在',
          position: 'middle',
          duration: 1500
        });
        toast.present();
      }
    });
  }
}
