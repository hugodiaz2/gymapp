import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Verificar el resultado del redireccionamiento de Google
    this.afAuth.getRedirectResult()
      .then((result) => {
        if (result.user) {
          console.log('Usuario autenticado con Google:', result.user);
          // Aquí puedes agregar al usuario a Firestore si es la primera vez que inicia sesión
          this.router.navigate(['/gym-inicio']);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el resultado de redirección:', error);
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

  loginWithGoogle() {
    console.log("Iniciando sesión con Google");
    this.authService.loginWithGoogle()
      .then(() => {
        console.log("Redirigiendo después del inicio de sesión con Google");
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión con Google", error);
      });
  }
  
}
