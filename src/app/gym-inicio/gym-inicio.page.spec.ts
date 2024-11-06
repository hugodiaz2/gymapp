import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GymInicioPage } from './gym-inicio.page';

describe('GymInicioPage', () => {
  let component: GymInicioPage;
  let fixture: ComponentFixture<GymInicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GymInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
