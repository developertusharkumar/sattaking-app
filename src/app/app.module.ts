import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    // variations 2 - 1- app 2. web  (same firebase config)
    AngularFireModule.initializeApp(environment.firebaseConfig), // project setup now we can use firebase
    AngularFireDatabaseModule, 
  ],
  providers: [FormBuilder,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
