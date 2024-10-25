import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logged in successfully!');
      })
      .catch(err => {
        console.error('Login error:', err);
      });
  }

  register() {
    // Navegar a la página de registro o implementar la lógica de registro aquí
  }
}
