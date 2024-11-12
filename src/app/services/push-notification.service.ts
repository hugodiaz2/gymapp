import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { mergeMapTo } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(
    private afMessaging: AngularFireMessaging,
    private afAuth: AngularFireAuth
  ) {}

  requestPermission() {
    this.afMessaging.requestToken
  .subscribe(
    (token) => {
      if (token) {
        console.log('Token recibido:', token);
      } else {
        console.error('No se recibió ningún token.');
      }
    },
    (error) => {
      console.error('Error al obtener el token:', error);
    }
  );

  }

  listen() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('Nuevo mensaje recibido:', message);
    });
  }
}
