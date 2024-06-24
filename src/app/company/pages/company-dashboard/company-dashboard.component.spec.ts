import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

// Importa el servicio CompanyService
import { CompanyService } from '../../services/company.service';

fdescribe('CompanyDashboardComponent', () => {
  let component: CompanyDashboardComponent;
  let fixture: ComponentFixture<CompanyDashboardComponent>;
  let mockCompanyService: Partial<CompanyService>; // Declara el mock como Partial

  beforeEach(async () => {
    // Crea el mock del servicio
    mockCompanyService = {
      getAllAdBookings: () =>
        of([
          {
            id: 1,
            userName: 'User 1',
            serviceName: 'Service 1',
            bookDate: new Date(),
            reservationStatus: 'PENDING',
          },
          {
            id: 2,
            userName: 'User 2',
            serviceName: 'Service 2',
            bookDate: new Date(),
            reservationStatus: 'APPROVED',
          },
        ]),
      changeBookingStatus: (bookingId: number, status: string) =>
        of({ success: true }),
    };

    await TestBed.configureTestingModule({
      declarations: [CompanyDashboardComponent],
      imports: [HttpClientModule, NzTableModule, BrowserAnimationsModule],
      providers: [
        { provide: CompanyService, useValue: mockCompanyService }, // Usa el mock aquí
        NzNotificationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display bookings correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const bookingRows = compiled.querySelectorAll('tbody tr');
    expect(bookingRows.length).toBe(2);
    expect(bookingRows[0].textContent).toContain('User 1');
    expect(bookingRows[1].textContent).toContain('User 2');
  });

  // Pruebas que causan el problema (comentadas)
  /*
  it('should fail to create', () => {
    expect(component).toBeFalsy();
  });

  it('should fail to load and display bookings correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const bookingRows = compiled.querySelectorAll('tbody tr');
    expect(bookingRows.length).toBe(3); // Cambiado a 3 para provocar fallo
    expect(bookingRows[0].textContent).toContain('User 1');
    expect(bookingRows[1].textContent).toContain('User 2');
  });

  it('should fail to change booking status and show notification', fakeAsync(() => {
    spyOn(component, 'getAllAdBookings').and.callThrough();
    spyOn(mockCompanyService, 'changeBookingStatus').and.callThrough();
    spyOn(component['notification'], 'success').and.callThrough();

    component.changeBookingStatus(1, 'Reject'); // Cambiado a 'Reject' para provocar fallo
    tick();
    fixture.detectChanges();

    expect(mockCompanyService.changeBookingStatus).toHaveBeenCalledWith(
      1,
      'Approve'
    );
    expect(component['notification'].success).toHaveBeenCalledWith(
      'ERROR',
      `Estado de evento no modificado`,
      { nzDuration: 5000 }
    );
    expect(component.getAllAdBookings).toHaveBeenCalled();
  }));
  */
});
