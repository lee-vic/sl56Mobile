import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserCalculationDetailPage } from '../pages';

/**
 * Generated class for the CalculationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculation-list',
  templateUrl: 'calculation-list.html',
})
export class CalculationListPage {
  calculateResultList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.calculateResultList=navParams.get("list");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculationListPage');
  }
  detail(item){
 
    this.navCtrl.push(UserCalculationDetailPage,{
        selectedItem:item
    });
  }

}
