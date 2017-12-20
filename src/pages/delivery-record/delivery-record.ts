import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';
import { DeliveryRecordProvider } from '../../providers/delivery-record/delivery-record';
import { deliveryRecord } from '../../models/delivery-record.model';
import { UserDeliveryRecordDetailPage } from '../pages';

/**
 * Generated class for the DeliveryRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery-record',
  templateUrl: 'delivery-record.html',
})
export class DeliveryRecordPage  implements OnInit, OnDestroy {
  
  deliveryRecordList:Array<deliveryRecord>;
  searchList:Array<deliveryRecord>;
  startDate:string;
  endDate:string;
  showFilter:boolean=false;
  @ViewChild(Content) content: Content;
  ngOnInit(): void {
    document.querySelector(".tabbar")['style'].display = 'none';
    this.getData();
  }
  ngOnDestroy(): void {
    document.querySelector(".tabbar")['style'].display = 'flex';
  }
  getData(){
    // let loading = this.loadingCtrl.create({
    //   content: '请稍后...',

    //   dismissOnPageChange: true
    // });
    // loading.present();
    this.service.getList(this.startDate,this.endDate).subscribe(res=>{
      // loading.dismiss();
      this.searchList=this.deliveryRecordList=res;
    });
  }

  constructor(public navCtrl: NavController, 
    public service:DeliveryRecordProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      let now=new Date();
      this.endDate=now.toISOString();
      this.startDate=new Date(now.setMonth(now.getMonth()-1)).toISOString();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryRecordPage');
  }
  filterClick(){
    if(!this.showFilter){
      this.showFilter=true;
      this.scrollToTop();
    }
    else{
      this.showFilter=false;
      this.getData();
    }
  }
  getItems(ev: any) {



    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchList = this.deliveryRecordList.filter((item) => {
        return (item.ReferenceNumber.toLowerCase().indexOf(val.toLowerCase()) > -1||item.TrackNumber.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.searchList = this.deliveryRecordList;
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  detail(item){
    console.log(item.Id);
    this.navCtrl.push(UserDeliveryRecordDetailPage,{
        id:item.Id
    });
  }
}
