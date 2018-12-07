import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ReturnProvider } from '../../providers/return/return';

/**
 * Generated class for the ReturnApplyHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return-apply-history',
  templateUrl: 'return-apply-history.html',
})
export class ReturnApplyHistoryPage implements OnInit {
  items: Array<string> = [];
  currentItem: string = "";
  ngOnInit(): void {
    this.service.applyHistory().subscribe(res => {
      this.items = res;
    });
  }

  constructor(public navCtrl: NavController,
    public service: ReturnProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnApplyHistoryPage');
  }
  selectedItems() {
    if (this.currentItem != "") {
      let data = { 'val': this.currentItem };
      this.viewCtrl.dismiss(data);
    }

  }
}
