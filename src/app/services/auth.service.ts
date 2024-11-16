import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {}

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.error("Error en el inicio de sesión:", error);
        throw error;
      });
  }

  register(email: string, password: string, additionalData: { name?: string, lastName?: string, role?: string } = {}): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const userId = userCredential.user?.uid;
        return this.firestore.collection('users').doc(userId).set({
          email: email,
          createdAt: new Date(),
          name: additionalData.name || '',
          lastName: additionalData.lastName || '',
          role: additionalData.role || 'user'
        });
      })
      .catch(error => {
        console.error("Error en el registro:", error);
        throw error;
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().catch(error => {
      console.error("Error al cerrar sesión:", error);
      throw error;
    });
  }

  loginWithFacebook(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then(result => {
        console.log("Inicio de sesión exitoso con Facebook:", result.user);
      })
      .catch(error => {
        console.error("Error en el inicio de sesión con Facebook:", error);
        throw error;
      });
  }
  

  handleRedirectResult(): void {
    this.afAuth.getRedirectResult()
      .then(result => {
        if (result.user) {
          console.log("Inicio de sesión exitoso:", result.user);
          // Aquí redirigimos al usuario a la página deseada
          this.router.navigate(['/gym-inicio']);
        }
      })
      .catch(error => {
        console.error("Error al manejar el resultado de la redirección:", error);
      });
  }
}
