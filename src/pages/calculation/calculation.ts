import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { CalculationProvider } from '../../providers/calculation/calculation';
import { CountryProvider } from '../../providers/country/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCalculationListPage } from '../pages';
// import { CookieService } from 'ngx-cookie-service';


@IonicPage()
@Component({
  selector: 'page-calculation',
  templateUrl: 'calculation.html',
})
export class CalculationPage implements OnInit {

  calculateMode = "1";
  countryList: any;
  modeOfTransportList: any;
  volumetricDivisorList: any;
  countrySearch: any;
  modeOfTransportId: number;
  selectedCountry: any;
  countryInput: string;
  showCountryList: boolean = false;
  public myForm: FormGroup;
  public loading: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public countryProvider: CountryProvider,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    // private cookieService: CookieService,
    public service: CalculationProvider) {
    this.myForm = this.formBuilder.group({
      ModeOfTransportId: ['0', Validators.required],
      productType: ['1', Validators.required],
      countryId: ['', Validators.required],
      actualWeight: ['', Validators.required],
      volumeWeight: [],
      declaredValue: [],
      postalCode: [],
      city: [],
      volumetric: ['1']
    });
  }
  ngOnInit(): void {
    this.service.getModeOfTransportList().subscribe(res => {
      this.modeOfTransportList = res;
    });
    this.service.getVolumetricDivisorList().subscribe(res => {
      this.volumetricDivisorList = res;
    });
    this.countryProvider.getCoutryList()
      .subscribe((res) => {
        this.countryList = this.countrySearch = res;
      });
    // if (this.cookieService.get('State') != "")
    //   this.viewCtrl.showBackButton(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculationPage');
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
  doCalculate(formValue) {
    if(this.selectedCountry==null)
      return;
    this.loading = this.loadingCtrl.create({
      content: '请稍后...',

      dismissOnPageChange: true
    });
    this.loading.present();
    formValue.countryId = this.selectedCountry.Id;
    this.service.calculate(formValue).subscribe((res) => {
      this.loading.dismiss();
      let resList = new Array(res);
      if (resList.length > 0) {
        this.navCtrl.push(UserCalculationListPage, {
          list: res
        })
      }
      else {
        let toast = this.toastCtrl.create({
          message: '当前条件未能找到合适报价，请修改条件重试',
          position: 'middle',
          duration: 1500
        });
        toast.present();
      }
    });
  }
}
