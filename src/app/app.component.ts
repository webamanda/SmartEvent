import { Router, RouterEvent } from '@angular/router';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CacheService } from "ionic-cache";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Eventos',
      url: '/eventos',
      icon: 'map'
    },
    
    {
      title: 'Login',
      url: '/login',
      icon: 'lock'
    },
    {
      title: 'Sobre',
      url: '/sobre',
      icon: 'information-circle'
    },
  ];
  selectedPath = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    cache: CacheService,
    private router: Router
  ) {
    this.initializeApp();
    cache.setDefaultTTL(30); //set default cache TTL for 1 hour
    this.router.events.subscribe((event: RouterEvent)=>{
      this.selectedPath = event.url;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
