import { Injectable } from '@angular/core';
import {
    LocalNotifications,
  } from "@ionic-native/local-notifications/ngx";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(
    private localNotifications: LocalNotifications,
    ) {}


    setLocalNotification(toDoText,toDoDate,toDoTime,game) {
        console.log('todo text', toDoText);
        console.log('todo date', toDoDate);
        console.log('todo time', toDoTime);
        console.log('game', game);
        const format = moment(toDoTime).format("hh:mm A");
        const time = moment(format, ["h:mm A"]).format("HH:mm").split(":");
        const date = moment(toDoDate).format("YYYY:MM:DD").split(":");
    
        console.log(
          "formatted date",
          new Date(
            parseInt(date[0]),
            parseInt(date[1]) - 1,
            parseInt(date[2]),
            parseInt(time[0]),
            parseInt(time[1])
          )
        );
    
        console.log("time", time);
        console.log("date", date);
        this.localNotifications.schedule({
          id: 1,
          title: `Game Reminder: ${game.name}`,
          text: toDoText,
          data: {},
          icon: 'file://assets/icon/favicon.png',
          trigger: {
            at: new Date(
              parseInt(date[0]),
              parseInt(date[1]) - 1,
              parseInt(date[2]),
              parseInt(time[0]),
              parseInt(time[1])
            ),
          },
          foreground: true,
        });
      }


}