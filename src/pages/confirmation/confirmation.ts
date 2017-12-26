import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ConfirmationProvider } from '../../providers/confirmation/confirmation';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage implements OnInit, OnDestroy {
  allSelected: boolean = false;
  total=0;
  ngOnDestroy(): void {
    document.querySelector(".tabbar")['style'].display = 'flex';
  }
  receiveGoodsDetailList: any;
  searchList: any;
  ngOnInit(): void {
    this.service.getReceiveGoodsDetailList().subscribe(res => {
      this.searchList = this.receiveGoodsDetailList = res;
      
    });
  }

  constructor(public navCtrl: NavController,
    public service: ConfirmationProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    document.querySelector(".tabbar")['style'].display = 'none';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }
  onAllClick() {

    this.searchList.forEach(element => {
      element.Selected = this.allSelected;
    });
  }
  getItems(ev: any) {



    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchList = this.receiveGoodsDetailList.filter((item) => {
        return (item.ReferenceNumber.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.searchList = this.receiveGoodsDetailList;
    }
  }
  onItemConfirmClick(item) {
    let confirm = this.alertCtrl.create({
      title: '确认出货?',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          handler: () => {
            this.doConfirm(item.Id.toString());
          }
        }
      ]
    });
    confirm.present();
  }
  onConfirmClick() {
    let selectedItems = this.receiveGoodsDetailList.filter(item => {
      return item.Selected == true;
    }).map(item => item.Id);

    if (selectedItems == undefined || selectedItems == "undefined" || selectedItems.length == 0) {
      let toast = this.toastCtrl.create({
        message: '请选择需要确认的运单',
        position: 'middle',
        duration: 1500
      });
      toast.present();
    }
    else {
      let confirm = this.alertCtrl.create({
        title: '确认出货?',
        message: '本次共选择' + selectedItems.length + "票",
        buttons: [
          {
            text: '取消'
          },
          {
            text: '确认',
            handler: () => {
              this.doConfirm(selectedItems.toString());
            }
          }
        ]
      });
      confirm.present();
    }
  }
  doConfirm(selectedIdList){
     let loading = this.loadingCtrl.create({
      content: '请稍后...',
    });
    loading.present();
    this.service.confirm(selectedIdList).subscribe(res=>{
      loading.dismiss();
      this.searchList = this.receiveGoodsDetailList = res;
    },(err)=>{
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.message,
        position: 'middle',
        duration: 3000
      });
      toast.present();
    });
  }

}
