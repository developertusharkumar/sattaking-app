import { Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService } from './services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalNotificationService } from './services/local-notifications.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localNotification: LocalNotifications,
    private platform: Platform,
    private localNotificationService: LocalNotificationService,
    ) {

      this.initializeApp();
  }

  
  ngOnInit() {
    
  }

  initializeApp() {
    this.platform.ready().then( async () => {


      //  trigger notification when the app starts running the first notification
      // this.localNotificationService.triggerFirstNotification();
      
      

      // this.localNotification.on('trigger').subscribe((response) => {
      //   console.log('response', response);
      // })
      // this.localNotification.on('click').subscribe((response) => {
      //   console.log('the notification is being clicked', response);
      // })
    })
  }


 
}
