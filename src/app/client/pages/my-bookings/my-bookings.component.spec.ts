import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBookingsComponent } from './my-bookings.component';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table'; // Importa el módulo correspondiente

fdescribe('MyBookingsComponent', () => {
  let component: MyBookingsComponent;
  let fixture: ComponentFixture<MyBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBookingsComponent],
      imports: [
        HttpClientModule,
        NzTableModule, // Agrega NzTableModule aquí
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
