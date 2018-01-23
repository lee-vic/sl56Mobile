import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubAccountProvider } from '../../providers/sub-account/sub-account';
import { SubAccount } from '../../models/sub-account.model';
import { UserEditSubAccountPage } from '../pages';

/**
 * Generated class for the SubAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-account',
  templateUrl: 'sub-account.html',
})
export class SubAccountPage implements OnInit {
  items: Array<SubAccount> = [];

  constructor(public navCtrl: NavController,
    private service: SubAccountProvider,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    //this.getList();
  }
  getList(){
    this.service.getList().subscribe(res => {
      this.items.length=0;
      this.items = res;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubAccountPage');
  }
  add() {
    this.navCtrl.push(UserEditSubAccountPage);
  }
  detail(item: SubAccount) {
    this.navCtrl.push(UserEditSubAccountPage, {
      id: item.ObjectId
    });
  }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
     this.getList();
   
  }
}
