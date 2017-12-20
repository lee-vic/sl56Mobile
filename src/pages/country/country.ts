import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CountryProvider } from '../../providers/country/country';

/**
 * Generated class for the CountryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country',
  templateUrl: 'country.html',
})
export class CountryPage implements OnInit {
  countryList:any;
  items:any;
  ngOnInit(): void {
      this.countryProvider.getCoutryList()
        .subscribe((res)=>{
          this.countryList=this.items=JSON.parse(res.toString()) ;
        });
  }

  constructor(public viewCtrl: ViewController,
    public countryProvider:CountryProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  filterItems(ev: any) {
   
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.countryList.filter(function(item) {
        return item.Name.toLowerCase().includes(val.toLowerCase());
      });
    }
    else{
      this.items=this.countryList;
    }
  }
  itemClick(item){
    this.viewCtrl.dismiss(item);
   
  }

}
