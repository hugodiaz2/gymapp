import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PushNotificationService } from '../services/push-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private pushNotificationService: PushNotificationService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Solicita permisos de notificación
    this.pushNotificationService.requestPermission();
  
    // Escucha mensajes push
    this.pushNotificationService.listen();
  
    // Verifica el estado de autenticación
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.authService.handleRedirectResult();
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .then((result) => {
          console.log('Login successful:', result);
          this.router.navigate(['/gym-inicio']);
        })
        .catch((error) => {
          console.error('Login error:', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

    // Método para mostrar una notificación básica
    mostrarNotification() {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('¡Hola desde GymApp!', {
          body: 'Esta es una notificación de prueba.',
        });
      } else {
        console.log('No se puede mostrar la notificación. Permiso no concedido.');
      }
    }
}
