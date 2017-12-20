import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { RemoteProvider } from '../../providers/remote/remote';
import { CountryProvider } from '../../providers/country/country';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the RemotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remote',
  templateUrl: 'remote.html',
})
export class RemotePage implements OnInit {
  modeOfTransportTypeList: any;
  countryList: any;
  public myForm: FormGroup;
  countrySearch: any;
  selectedCountry: any;
  countryInput: string;
  showCountryList: boolean = false;

  constructor(public navCtrl: NavController,
    public service: RemoteProvider,
    public countryService: CountryProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      ModeOfTransportTypeId: ['1', Validators.required],
      countryId: ['', Validators.required],
      postalCode: [''],
      city: [''],
    });
  }

  ngOnInit(): void {
    this.service.getModeOfTransportTypeList().subscribe(res => {
      this.modeOfTransportTypeList = res;
    });
    this.countryService.getCoutryList().subscribe(res => {
      this.countryList = this.countrySearch = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotePage');
  }
  filterCountryItems(ev: any) {

    let val = this.countryInput;
    this.showCountryList = true;
    this.selectedCountry = null;
    if (val && val.trim() !== '') {
      this.countrySearch = this.countryList.filter(function (item) {
        return item.Name.toLowerCase().includes(val.toLowerCase());
      });

    }
    else {
      this.countrySearch = this.countryList;
    }
  }

  countryItemClick(item) {

    this.showCountryList = false;
    this.countryInput = item.Name;
    this.selectedCountry = item;
  }

  onCountryKeyup($event) {


    if ($event.keyCode == 13) {
      this.selectCountry();
    }

  }
  onCountryBlur() {
    this.selectCountry();
  }
  selectCountry() {
    if (this.countrySearch.length == 1) {
      this.showCountryList = false;
      this.countryInput = this.countrySearch[0].Name;
      this.selectedCountry = this.countrySearch[0];
    }
  }
  doQuery(formValue) {
    formValue.countryId = this.selectedCountry.Id;
    console.log(formValue);
    this.service.Query(formValue).subscribe(res => {
      let title;
      if (res)
        title = "偏远";
      else
        title = "不偏远"
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: '当前查询仅供参考',
        buttons: ['返回']
      });
      alert.present();
    });
  }
}
