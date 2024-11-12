import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pushNotificationService: PushNotificationService) {}

  ngOnInit() {
    // Solicita permiso para las notificaciones push al cargar el componente
    this.pushNotificationService.requestPermission();
    
    // Escucha las notificaciones recibidas
    this.pushNotificationService.listen();
  }
}
