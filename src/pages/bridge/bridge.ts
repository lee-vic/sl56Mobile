import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CookieService } from 'ngx-cookie-service';
/**
 * Generated class for the BridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bridge',
  templateUrl: 'bridge.html',
})
export class BridgePage implements OnInit {
  ngOnInit(): void {
    alert(this.cookieService.get('State'));
    this.navCtrl.push(this.cookieService.get('State'));
  }

  constructor(public navCtrl: NavController, 
    private cookieService: CookieService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BridgePage');
  }

}
