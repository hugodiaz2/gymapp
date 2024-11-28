import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage {
  userData = {
    age: null,
    height: null,
    weight: null,
    gender: null,
  };

  constructor() {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (
      this.userData.age &&
      this.userData.height &&
      this.userData.weight &&
      this.userData.gender
    ) {
      localStorage.setItem('userData', JSON.stringify(this.userData));
      console.log('Datos guardados en LocalStorage:', this.userData);
      alert('Datos guardados con éxito!');
    } else {
      alert('Por favor, rellena todos los campos.');
    }
  }
  
}
