import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  edad: number | null = null;
  altura: number | null = null;
  peso: number | null = null;
  genero: string = '';
  editMode: boolean = false;

  constructor() {}

  ngOnInit() {
    // Cargar los datos desde el Local Storage al iniciar la página
    const savedData = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (savedData) {
      this.edad = savedData.edad || null;
      this.altura = savedData.altura || null;
      this.peso = savedData.peso || null;
      this.genero = savedData.genero || '';
    }
  }

  guardarDatos() {
    // Guardar los datos en el Local Storage
    const usuario = {
      edad: this.edad,
      altura: this.altura,
      peso: this.peso,
      genero: this.genero,
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.editMode = false; // Salir del modo de edición
  }

  habilitarEdicion() {
    this.editMode = true; // Habilitar modo de edición
  }
}
