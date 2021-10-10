import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor(public modalController: ModalController) { }

  async presentModal(modalPage,props,customClass, callback) {
    
    const modal = await this.modalController.create({
      component: modalPage,
      cssClass: customClass,
      componentProps: props
    });

    
    modal.onDidDismiss()
      .then((data) => {
         callback(data) // Here's your selected user!
    });

    
    return await modal.present();
  }

  dismiss(gameType) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    
    this.modalController.dismiss({
      'gameType': gameType
    });
  }



  


}
