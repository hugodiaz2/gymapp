// src/app/register/register.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastName: ['']
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password, name, lastName } = this.registerForm.value;
      this.authService.register(email, password, { name, lastName, role: 'user' }).then(
        (result) => {
          console.log('Registration successful:', result);
          this.router.navigate(['/home']);
        }
      ).catch(error => {
        console.error('Registration error:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
