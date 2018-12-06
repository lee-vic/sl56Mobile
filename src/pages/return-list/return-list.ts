import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Searchbar, ToastController, AlertController } from 'ionic-angular';
import { ReturnProvider } from '../../providers/return/return';
import { UserDeliveryRecordDetailPage, UserReturnApplyPage } from '../pages';

/**
 * Generated class for the ReturnListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-list',
  templateUrl: 'return-list.html',
})
export class ReturnListPage implements OnInit{
  items1: Array<any> = [];
  items2: Array<any> = [];
  items3: Array<any> = [];
  currentPageIndex: number = 1;
  isBusy: boolean = false;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Searchbar) searchbar: Searchbar;
  ngOnInit(): void {
    this.getItems1("",false);
    
  }
  tab="1";
  constructor(public navCtrl: NavController, 
    public service:ReturnProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnListPage');
  }
  scrollItems($event) {
    this.getItems1(this.searchbar.value,true);
   
  }
  getItems1(key:string,isScroll:boolean) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList1(this.currentPageIndex, key).subscribe(res => {
      let flag = res.length < 10;
      this.infiniteScroll.enable(!flag);
      for (var i = 0; i < res.length; i++) {
        this.items1.push(res[i]);
      }
      this.currentPageIndex++;
      if(isScroll)
        this.infiniteScroll.complete();
      this.isBusy = false;
    });
  }
  getItems2() {
  
    this.service.getList2().subscribe(res => {
      this.items2=res;
      this.items2.forEach(element=>{
        let val:string=element.ReferenceNumber;
        let tempArray=new Array();
        let vals=val.split(',');
        vals.forEach(ele=>{
          tempArray.push(ele.split('_')[1]);
        });
        element.ReferenceNumber=tempArray.toString();
      });
    });
  }
  getItems3() {
  
    this.service.getList3().subscribe(res => {
      this.items3=res;
      this.items3.forEach(element=>{
        let val:string=element.ReferenceNumber;
        let tempArray=new Array();
        let vals=val.split(',');
        vals.forEach(ele=>{
          tempArray.push(ele.split('_')[1]);
        });
        element.ReferenceNumber=tempArray.toString();
      });
    });
  }
  searchItems() {
    let val = this.searchbar.value;
    let key = val.trim();
    this.currentPageIndex = 1;
    this.items1.length = 0;
    this.getItems1(key,false);
  }
  detail(item) {
    this.navCtrl.push(UserDeliveryRecordDetailPage, {
      id: item.Id
    });
  }
  cancelApply(item){
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '确定要取消当前退货申请吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
          
        },
        {
          text: '确定',
          handler: () => {
            this.service.terminate(item.ObjectId).subscribe(res=>{
              if(res.Success==true){
                this.getItems2();
                let toast = this.toastCtrl.create({
                  message: '您的退货申请已成功取消',
                  duration: 3000,
                  position: 'middle'
                });
              
                toast.present();
              }
            });
          }
        }
      ]
    });
    alert.present();
    
  }
  fill(item){
    this.navCtrl.push(UserReturnApplyPage, {
      id: item.ObjectId,
      type:1
    });
  }
  ionViewWillEnter(){
    this.getItems3();
    this.getItems2();
  }

}
