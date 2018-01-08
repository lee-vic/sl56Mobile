import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { User } from '../providers/user/user';
import { CountryProvider } from '../providers/country/country';
import { RemoteProvider } from '../providers/remote/remote';
import { ConfirmationProvider } from '../providers/confirmation/confirmation';
import { DeliveryRecordProvider } from '../providers/delivery-record/delivery-record';
import { WechatPayProvider } from '../providers/wechat-pay/wechat-pay';
import { DeliveryRecordDetailProvider } from '../providers/delivery-record-detail/delivery-record-detail';
import { WechatPayListProvider } from '../providers/wechat-pay-list/wechat-pay-list';
import { WechatBindingProvider } from '../providers/wechat-binding/wechat-binding';
import { CookieService } from 'ngx-cookie-service';
import { CalculationProvider } from '../providers/calculation/calculation';
import { NoticeProvider } from '../providers/notice/notice';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      mode:"ios",
      backButtonText:"返回",
      tabsHideOnSubPages:true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,
    CookieService,
    CountryProvider,
    RemoteProvider,
    ConfirmationProvider,
    DeliveryRecordProvider,
    WechatPayProvider,
    DeliveryRecordDetailProvider,
    WechatPayListProvider,
    CalculationProvider,
    WechatBindingProvider,
    NoticeProvider
  ]
})
export class AppModule {}
