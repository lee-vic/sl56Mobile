import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { ConfirmationProvider } from '../../providers/confirmation/confirmation';
import { UserDeliveryRecordDetailPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage implements OnInit {
  allSelected: boolean = false;
  total = 0;
  receiveGoodsDetailList: any;
  searchList: any;

  constructor(public navCtrl: NavController,
    public service: ConfirmationProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {

  }
  ngOnInit(): void {
    this.service.getReceiveGoodsDetailList().subscribe(res => {
      this.searchList = this.receiveGoodsDetailList = res;
    });
   
  
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
    let val = ev.target.value;
    console.log(val);
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
      message: '请仔细核实数据准确无误，运单确认后任何更改将收取操作费！',
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
        message: '本次共选择' + selectedItems.length + "票.请仔细核实数据准确无误，运单确认后任何更改将收取操作费！",
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
  doConfirm(selectedIdList) {
    let loading = this.loadingCtrl.create({
      content: '请稍后...',
    });
    loading.present();
    this.service.confirm(selectedIdList).subscribe(res => {
      loading.dismiss();
      this.searchList = this.receiveGoodsDetailList = res;
    }, (err) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.message,
        position: 'middle',
        duration: 3000
      });
      toast.present();
    });
  }
  detail(item){
    this.navCtrl.push(UserDeliveryRecordDetailPage,{
      id:item.Id
  });
  }

}
