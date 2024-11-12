import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para hacer llamadas HTTP
import { environment } from '../environments/environment';
import { RouteReuseStrategy } from '@angular/router';

// Importa el servicio de ejercicios
import { ExerciseService } from './services/exercise.service'; 

// Importaciones de Firebase Authentication
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule // Asegúrate de incluir HttpClientModule aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ExerciseService,
    provideFirebaseApp(() => initializeApp({"projectId":"gymapp-84e17","appId":"1:1062454112173:web:ef32b2385508c6c44f3b24","storageBucket":"gymapp-84e17.firebasestorage.app","apiKey":"AIzaSyBidqMx8zbQRAo8ynfv6u-ULUs87DHpzgg","authDomain":"gymapp-84e17.firebaseapp.com","messagingSenderId":"1062454112173","measurementId":"G-SJ8HB2P1V3"})),
    provideMessaging(() => getMessaging()) // Cambiado a ExerciseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
