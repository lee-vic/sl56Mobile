import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SubAccountProvider } from '../../providers/sub-account/sub-account';
import { SubAccount } from '../../models/sub-account.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the EditSubAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-sub-account',
  templateUrl: 'edit-sub-account.html',
})
export class EditSubAccountPage implements OnInit {
  id: any;
  data: SubAccount = new SubAccount();
  title: string;
  isNew: boolean;
  public myForm: FormGroup;
  constructor(public navCtrl: NavController,
    private service: SubAccountProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
    this.id = navParams.get("id");
    console.log(this.id);
    if (this.id == undefined) {
      this.title = "新增子帐号";
      this.isNew = true;
    }
    else {
      this.title = "编辑子帐号";
      this.isNew = false;
    }
    this.myForm = this.formBuilder.group({
      objectname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16)
      ])],
      objectno: [{value:'',disabled:!this.isNew}, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(8),
        Validators.pattern("^[0-9A-Za-z_]+$")
      ])],
        //赋值绕过表单验证
      password: ['1234abcd', Validators.compose([
        Validators.required,
        Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")])],
      password1: ['', Validators.compose([
        Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")])],
      discount: ['', Validators.compose([
        Validators.required,
        Validators.min(0.01),
        Validators.max(10)
      ])],
    });
  }
  validation_messages={
    "objectname":[
      {type:"required",message:"名称必须输入"},
      {type:"minlength",message:"名称至少为2位"},
      {type:"maxlength",message:"名称不能超过16位"}
    ],
    "objectno":[
      {type:"required",message:"帐号必须输入"},
      {type:"minlength",message:"帐号至少为2位"},
      {type:"maxlength",message:"帐号不能超过8位"},
      { type:"pattern",message:"账号只能包含字母、数字、下划线"}
    ],
    "password":[
      {type:"required",message:"登录密码不能为空"},
      {type:"pattern",message:"长度为8-16位并且是字母和数字的组合"}
    ],
    "newPassword1":[
      {type:"pattern",message:"长度为8-16位并且是字母和数字的组合"}
    ],
    "discount":[
      {type:"required",message:"折扣必须输入"},
      {type:"min",message:"折扣不能小于0.01"},
      {type:"max",message:"折扣不能大于10"}
    ]
   
  }
  ngOnInit(): void {
    if (this.id != undefined) {
      this.service.detail(this.id).subscribe(res => {
        
        this.data = res;
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubAccountPage');
  }
  onSubmit(formValue) {
    console.log(this.data);
    if (this.isNew) {
      this.service.create(this.data).subscribe(res => {
        if (res.Success) {
          this.navCtrl.pop();
        }
        else {
          let toast = this.toastCtrl.create({
            message: res.ErrMsg,
            position: 'middle',
            duration: 3000
          });
          toast.present();
        }

      });
    }
    else {
      this.service.edit(this.data).subscribe(res => {
        this.navCtrl.pop();
      });
    }
  }
  delete() {

    let confirm = this.alertCtrl.create({
      title: '确定删除?',
      buttons: [
        {
          text: '取消',
        },
        {
          text: '确定',
          handler: () => {
            this.service.delete(this.id).subscribe(res => {
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
