import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gym-inicio',
  templateUrl: './gym-inicio.page.html',
  styleUrls: ['./gym-inicio.page.scss']
})
export class GymInicioPage implements OnInit {
  exercises: any[] = [];
  bodyParts: string[] = [];
  selectedBodyPart: string = '';
  selectedExerciseId: number | null = null;

  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBodyParts();
    this.loadExercises();
  }

  // Método para cargar partes del cuerpo
  loadBodyParts() {
    this.exerciseService.getBodyParts()
      .subscribe(
        (data: any) => this.bodyParts = data,
        error => console.error('Error al cargar partes del cuerpo:', error)
      );
  }

  // Método para cargar ejercicios, con o sin filtros
  loadExercises() {
    if (this.selectedBodyPart) {
      this.exerciseService.getExercises('bodyPart', this.selectedBodyPart)
        .subscribe(
          (data: any) => this.exercises = data,
          error => console.error('Error al cargar ejercicios filtrados:', error)
        );
    } else {
      this.exerciseService.getExercises()
        .subscribe(
          (data: any) => this.exercises = data,
          error => console.error('Error al cargar ejercicios:', error)
        );
    }
  }

  // Método para actualizar la lista de ejercicios cuando el usuario selecciona una parte del cuerpo
  onBodyPartChange() {
    this.loadExercises();
  }

  // Método para aplicar la clase 'loaded' cuando la imagen carga correctamente
  onImageLoad(event: Event) {
    (event.target as HTMLImageElement).classList.add('loaded');
  }

  // Método para manejar errores de carga de la imagen y mostrar una imagen alternativa o mensaje
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default-image.png';
  }

  // Método para seleccionar un ejercicio y mostrar sus instrucciones
  selectExercise(exerciseId: number) {
    this.selectedExerciseId = this.selectedExerciseId === exerciseId ? null : exerciseId;
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout()
      .then(() => {
        console.log("Sesión cerrada");
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error("Error al cerrar sesión:", error);
      });
  }
}
