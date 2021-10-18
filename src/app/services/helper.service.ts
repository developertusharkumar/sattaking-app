import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { relativeTimeThreshold } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  loaderRef: HTMLIonLoadingElement;
  isLoading = false;
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    public toastController: ToastController,
    public loader: LoadingController
  ) {}

  async presentToast(message, timer) {
    const toast = await this.toastController.create({
      message: message,
      duration: timer,
    });
    toast.present();
  }

  presentLoader() {
    this.loader
      .create({
        spinner: 'crescent',
        message: 'Please Wait...',
      })
      .then((res) => {
        res.present();
      });
  }

  async dismissLoader() {
    this.loader.dismiss().then((res) => {
      console.log('dismissed');
    });
  }
}
