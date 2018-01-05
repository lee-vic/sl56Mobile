import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';


/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  tab="1";
  currentProduct:number=1;
  @ViewChild('DHL') DHLElement:ElementRef;
  @ViewChild('FedEx') FedExElement:ElementRef;
  @ViewChild('UPS') UPSElement:ElementRef;
  @ViewChild('TNT') TNTElement:ElementRef;
  @ViewChild(Content) content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.tab=navParams.get("tab");
    
      if(this.tab==undefined)
        this.tab="1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    
  }
  ionViewDidEnter(){
    let homeSelected=localStorage.getItem("homeSelectedProduct");
    if(homeSelected!=null){
      this.tab= localStorage.getItem("homeSelectedProduct");
      localStorage.removeItem("homeSelectedProduct");
    }
      
  }
  gotoDHL(){
    this.content.scrollTo(0,this.DHLElement.nativeElement.offsetTop);
    this.currentProduct=1;
  }
  gotoFedEx(){
    this.content.scrollTo(0,this.FedExElement.nativeElement.offsetTop);
    this.currentProduct=2;
  }
  gotoUPS(){
    this.content.scrollTo(0,this.UPSElement.nativeElement.offsetTop);
    this.currentProduct=3;
  }
  gotoTNT(){
    this.content.scrollTo(0,this.TNTElement.nativeElement.offsetTop);
    this.currentProduct=4;
  }
}
