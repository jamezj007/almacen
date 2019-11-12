import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Dashboard',
      url: 'tabs/Dashboard',
      icon: 'pie'
    },
    {
      title: 'Bodegas',
      url: 'bodegas',
      icon: 'business'
    },
    {
      title: 'Productos',
      url: 'productos',
      icon: 'cube'
    },
    {
      title: 'Usuarios',
      url: 'usuarios',
      icon: 'contacts'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public ds:  DataService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.ds.initDatabase().then(() => {
        // this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#1e3246')
        this.splashScreen.hide();
      });
    });
  }
  page(page){
    if(page){ //'productos'
      this.navCtrl.navigateForward([page]);
    }
  }
  SignOut(){}
}
