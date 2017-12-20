import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the CalculationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculation-detail',
  templateUrl: 'calculation-detail.html',
})
export class CalculationDetailPage {
  data:any;
  tab="1";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data=navParams.get("selectedItem");
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculationDetailPage');
  }

}
