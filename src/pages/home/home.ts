import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { HomeAboutPage } from '../pages';

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
      title: "公司通知",
      description: "升蓝重要通知",
      image: "assets/imgs/home-news-1.png",
      cateId: 2
    },
    {
      title: "业务信息",
      description: "升蓝最新信息",
      image: "assets/imgs/home-news-2.png",
      cateId: 3
    },
    {
      title: "关于我们",
      description: "升蓝介绍",
      image: "assets/imgs/home-news-2.png"
    }
  ];
  slides = [
    {
      image: "assets/imgs/home-slidebox-1.png",
    },
    {
      image: "assets/imgs/home-slidebox-2.png",
    },
    {
      image: "assets/imgs/home-slidebox-3.png",
    }
  ];
  products = [
    {
      image: "assets/imgs/home-product-1.png",
      product: "1"
    },
    {
      image: "assets/imgs/home-product-2.png",
      product: "2"
    },
    {
      image: "assets/imgs/home-product-3.png",
      product: "3"
    }
  ]
  constructor(public navCtrl: NavController,

    public navParams: NavParams) {

    // alert(this.cookieService.get("sl56Auth"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  openProduct(prod) {

    let tabs: Tabs = this.navCtrl.parent;
    localStorage.setItem("homeSelectedProduct", prod.product);
    tabs.select(1);


    //this.navCtrl.push(ProductPage,{tab:prod.product},{updateUrl:true});
  }
  openNews(item) {
    if (item.cateId != undefined) {
      let tabs: Tabs = this.navCtrl.parent;
      localStorage.setItem("homeSelectedNews", item.cateId);
      tabs.select(2);
    }
    else{
      this.navCtrl.push(HomeAboutPage)
    }
  }

}
