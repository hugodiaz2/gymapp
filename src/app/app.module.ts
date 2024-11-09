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
    ExerciseService // Cambiado a ExerciseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
