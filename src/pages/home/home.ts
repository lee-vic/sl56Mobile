import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  news = [
    {
      title:"公司通知",
      description:"升蓝重要通知",
      image:"assets/imgs/home-news-1.png"
    },
    {
      title:"业务信息",
      description:"升蓝最新信息",
      image:"assets/imgs/home-news-2.png"
    }
  ];
  slides = [
    {
      image:"assets/imgs/home-slidebox-1.png",
    },
    {
      image:"assets/imgs/home-slidebox-1.png",
    },
    {
      image:"assets/imgs/home-slidebox-1.png",
    }
  ];
  products =[
    {
      image:"assets/imgs/home-product-1.png",
      product:"1"
    },
    {
      image:"assets/imgs/home-product-2.png",
      product:"2"
    },
    {
      image:"assets/imgs/home-product-3.png",
      product:"3"
    }
  ]
  constructor(public navCtrl: NavController, 
   
    public navParams: NavParams) {
   
    // alert(this.cookieService.get("sl56Auth"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  openProduct(prod){
   
    let tabs:Tabs=this.navCtrl.parent;
    localStorage.setItem("homeSelectedProduct",prod.product);
    tabs.select(1);
    
   
    //this.navCtrl.push(ProductPage,{tab:prod.product},{updateUrl:true});
  }

}
