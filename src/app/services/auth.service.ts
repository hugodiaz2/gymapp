// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential);
        return userCredential;
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }

  // Método para registrar un nuevo usuario y almacenar datos adicionales en Firestore
  register(email: string, password: string, additionalData: { name?: string, lastName?: string, role?: string } = {}) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user?.uid;

        // Guardar datos adicionales en Firestore
        return this.firestore.collection('users').doc(userId).set({
          email: email,
          createdAt: new Date(),
          name: additionalData.name || '',
          lastName: additionalData.lastName || '',
          role: additionalData.role || 'user' // Rol predeterminado 'user' si no se especifica
        });
      })
      .catch(error => {
        console.error('Registration error:', error);
        throw error;
      });
  }

  // Método para cerrar sesión
  logout() {
    return this.afAuth.signOut()
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        throw error;
      });
  }

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('Google login successful:', result);
        // Aquí puedes guardar datos adicionales en Firestore si es necesario
        const userId = result.user?.uid;
        return this.firestore.collection('users').doc(userId).set({
          email: result.user?.email,
          createdAt: new Date(),
          name: result.user?.displayName || '',
          role: 'user' // Rol predeterminado 'user'
        }, { merge: true });
      })
      .catch((error) => {
        console.error('Google login error:', error);
        throw error; 
      });
  }
}
