import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TemplateProvider } from '../../providers/template/template';
import { Template } from '../../models/template.model';
import { apiUrl } from '../../globals';

/**
 * Generated class for the TemplateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-template-list',
  templateUrl: 'template-list.html',
})
export class TemplateListPage implements OnInit {
 
  currentPageIndex: number = 1;
  items: Template[] = [];
  isBusy: boolean = false;
  constructor(public navCtrl: NavController, 
    private service:TemplateProvider,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getItems(null);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TemplateListPage');
  }
  getItems(infiniteScroll) {
    if (this.isBusy == true)
      return;
    this.isBusy = true;
    this.service.getList(this.currentPageIndex).subscribe(res => {
    
      if (res.length < 10) {
        infiniteScroll.enable(false);
      }
      for (var i = 0; i < res.length; i++) {
        res[i].Url=apiUrl + "/Template/Download/"+res[i].Id;
        this.items.push(res[i]);
      }
      this.currentPageIndex++;
      if (infiniteScroll != null)
        infiniteScroll.complete();
      this.isBusy = false;
    });
  }
}
