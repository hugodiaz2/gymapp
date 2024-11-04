import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(
      (result) => {
        console.log('Login successful:', result);
        // Maneja el resultado del inicio de sesión
      }
    ).catch(error => {
      console.error('Login error:', error);
      // Maneja el error
    });
  }

  register() {
    // Navega a la página de registro
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(
      (result) => {
        console.log('Google login successful:', result);
        // Maneja el resultado del inicio de sesión con Google
      }
    ).catch(error => {
      console.error('Google login error:', error);
      // Maneja el error
    });
  }
}
