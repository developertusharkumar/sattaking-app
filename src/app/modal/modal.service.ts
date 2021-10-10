import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalController: ModalController) { }

  async presentModal(modalPage,props,customClass) {
    
    const modal = await this.modalController.create({
      component: modalPage,
      cssClass: customClass,
      componentProps: props
    });
    return await modal.present();
  }


}
