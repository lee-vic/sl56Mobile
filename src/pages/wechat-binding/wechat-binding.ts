import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WechatBindingProvider } from '../../providers/wechat-binding/wechat-binding';

/**
 * Generated class for the WechatBindingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wechat-binding',
  templateUrl: 'wechat-binding.html',
})
export class WechatBindingPage implements OnInit {
  
  list:any;

  constructor(public navCtrl: NavController, 
    public service:WechatBindingProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.service.getList().subscribe(res=>{
      this.list=res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WechatBindingPage');
  }
  onItemDeleteClick(item){
    let confirm = this.alertCtrl.create({
      title: '解除微信账号绑定',
      message: '解除绑定后你无法使用微信快捷登陆，除非您再次绑定',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.service.delete(item.Id).subscribe(res=>{
              this.list=res;
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
