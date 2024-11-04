import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrar un nuevo usuario
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  logout() {
    return this.afAuth.signOut();
  }

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('Google login successful:', result);
      })
      .catch((error) => {
        console.error('Google login error:', error);
        throw error; // Esto permite que el error se maneje en el componente
      });
  }
  
}
