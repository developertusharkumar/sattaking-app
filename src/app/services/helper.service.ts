import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public toastController: ToastController) { }

  
  async presentToast(message,timer) {
    const toast = await this.toastController.create({
      message: message,
      duration: timer
    });
    toast.present();
  }
}
