import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      mobile: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassword1Page');
  }
  getCode(event){
    event.preventDefault();
    console.log("getcode click");
  }
  doNext(formValue){
      console.log(formValue);
  }
}
