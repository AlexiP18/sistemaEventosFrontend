import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientDashboardComponent } from './client-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importa el módulo correcto

fdescribe('ClientDashboardComponent', () => {
  let component: ClientDashboardComponent;
  let fixture: ComponentFixture<ClientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientDashboardComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule, // Agrega el módulo de formularios reactivos
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
