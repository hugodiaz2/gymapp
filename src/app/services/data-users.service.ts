import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private collectionName = 'users';

  constructor(private firestore: AngularFirestore) {}

  // Guardar o actualizar datos del usuario
  saveUserData(userId: string, data: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(userId).set(data, { merge: true });
  }

  // Obtener datos del usuario
  getUserData(userId: string): Observable<any> {
    return this.firestore.collection(this.collectionName).doc(userId).valueChanges();
  }
}
