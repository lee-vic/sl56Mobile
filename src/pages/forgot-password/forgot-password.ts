import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  doNext(){

  }
}
