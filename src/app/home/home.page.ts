// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para iniciar sesión con correo y contraseña
  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).then(
        (result) => {
          console.log('Login successful:', result);
          this.router.navigate(['/gym-inicio']); // Redirige a la nueva página gym-inicio
        }
      ).catch(error => {
        console.error('Login error:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Redirige a la página de registro si es necesario
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
