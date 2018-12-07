import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReturnProvider } from '../../providers/return/return';
import { UserReturnApplyHistoryPage } from '../pages';

/**
 * Generated class for the ReturnApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-apply',
  templateUrl: 'return-apply.html',
})
export class ReturnApplyPage implements OnInit {
  id: any;
  data: any;
  type: number;
  ngOnInit(): void {
    //客户主动申请填写提货人资料
    if (this.type == 0) {
      this.service.apply(this.id).subscribe(res => {
        this.data = res;
        if (res.AllowApply == false) {
          let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: res.Message,
            buttons: [{
              text: "确定",
              role: "cancel",
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          alert.present();
        }
        else {
          this.applyForm.controls["RequiredDate"].setValue(res.RequiredDate);
          this.applyForm.controls["ReferenceNumber"].setValue(res.ReferenceNumber);
        }
      });
    }
    //内部发起填写提货人资料
    else if (this.type == 1) {
      this.service.fill(this.id).subscribe(res => {
        this.applyForm.controls["RequiredDate"].setValue(res.RequiredDate);
        this.applyForm.controls["ReferenceNumber"].setValue(res.ReferenceNumber);
      });
    }

  }
  public applyForm: FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public service: ReturnProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    this.id = navParams.get("id");
    this.type = navParams.get("type");
    this.applyForm = this.formBuilder.group({
      PersonName: ['', Validators.required],
      IDCardNumber: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      PlateNumber: ['', Validators.pattern("([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})")],
      Remark: [''],
      RequiredDate: [],
      ReferenceNumber: [],
      IdList: [navParams.get("id")],
      WorkflowReturnGoodsId: [navParams.get("id")]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnApplyPage');
  }
  doSubmit(form) {
    if (this.type == 0) {
      this.doApply(form);
    }
    else {
      this.doFill(form);
    }

  }
  doApply(form) {
    this.service.apply1(form).subscribe(res => {
      if (res.IsSuccess == false) {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: res.Message,
          buttons: ['确定']
        });
        alert.present();
      }
      else {
        let toast = this.toastCtrl.create({
          message: '您的退货申请已成功提交',
          duration: 3000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          this.navCtrl.pop();
        });
        toast.present();
      }
    });
  }
  doFill(form) {
    this.service.fill1(form).subscribe(res => {
      if (res.IsSuccess == false) {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: res.Message,
          buttons: ['确定']
        });
        alert.present();
      }
      else {
        let toast = this.toastCtrl.create({
          message: '您的提货人信息已成功提交',
          duration: 3000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          this.navCtrl.pop();
        });
        toast.present();
      }
    });
  }
  history() {
    let historyPage = this.modalCtrl.create(UserReturnApplyHistoryPage);
    historyPage.onDidDismiss(data => {
      let vals = data.val.split(' ');
      this.applyForm.controls["PersonName"].setValue(vals[0]);
      this.applyForm.controls["IDCardNumber"].setValue(vals[1]);
      if (vals.length > 2)
        this.applyForm.controls["PlateNumber"].setValue(vals[2]);
    });
    historyPage.present();
  }
}
