import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BankSlipsProvider } from '../../providers/bank-slips/bank-slips';
import { BankSlips } from '../../models/bank-slips.model';
import { apiUrl } from '../../globals';

/**
 * Generated class for the BankSlipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-slips',
  templateUrl: 'bank-slips.html',
})
export class BankSlipsPage implements OnInit {
  ngOnInit(): void {
    this.getItems(null);
  }
  public form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;
  isBusy: boolean = false;
  currentPageIndex: number = 1;
  items: BankSlips[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public service: BankSlipsProvider,
    public alertCtrl: AlertController) {
    this.form = this.formBuilder.group({

      file: null
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankSlipsPage');

  }


  onFileChange(event) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('file').setValue({
          name: file.name,
          type: file.type,
          value: reader.result.split(',')[1]
        });

        this.service.upload(this.form.value.file).subscribe(res => {
          if(res.Success){
            this.refreshList();
          }

        });
      };
    }
  }

  doSubmit(event) {
    let el: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    el.click();
  }

  getItems(infiniteScroll) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList(this.currentPageIndex).subscribe(res => {

      if (res.length < 15 && infiniteScroll != null) {
        infiniteScroll.enable(false);
      }
      for (var i = 0; i < res.length; i++) {
        res[i].Url = apiUrl + "/UploadBankSlips/Detail/" + res[i].Id;
        this.items.push(res[i]);
      }
      this.currentPageIndex++;
      if (infiniteScroll != null)
        infiniteScroll.complete();
      this.isBusy = false;
    });
  }
  delete(id) {

    let confirm = this.alertCtrl.create({
      title: '确认删除当前回单?',

      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          handler: () => {
            this.doDelete(id);
          }
        }
      ]
    });
    confirm.present();
  }
  doDelete(id) {
    this.service.delete(id).subscribe(res => {
      console.log(res);
      if (!res.Success) {
        const alert = this.alertCtrl.create({
          title: '删除失败',
          subTitle: res.ErrMsg,
          buttons: ['确定']
        });
        alert.present();
      }
      else{
        this.refreshList();
      }
    });
  }
  refreshList(){
    this.currentPageIndex=1;
    this.items.length=0;
    this.getItems(null);
  }
}
