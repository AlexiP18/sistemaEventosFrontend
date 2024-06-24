import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { AllAdsComponent } from './all-ads.component';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { of } from 'rxjs';
import { CompanyService } from '../../services/company.service';

// Mock del CompanyService
class MockCompanyService {
  getAllAdsByUserId() {
    return of([
      {
        id: 1,
        serviceName: 'Service 1',
        price: 100,
        description: 'Description 1',
        returnedImg: 'image1base64',
      },
      {
        id: 2,
        serviceName: 'Service 2',
        price: 200,
        description: 'Description 2',
        returnedImg: 'image2base64',
      },
    ]);
  }

  deletedAd(adId: any) {
    return of({ success: true });
  }
}

fdescribe('AllAdsComponent', () => {
  let component: AllAdsComponent;
  let fixture: ComponentFixture<AllAdsComponent>;
  let mockCompanyService: MockCompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAdsComponent],
      imports: [
        HttpClientModule,
        NzButtonModule,
        NzTableModule,
        RouterTestingModule,
        BrowserAnimationsModule, // Añade BrowserAnimationsModule
      ],
      providers: [
        { provide: CompanyService, useClass: MockCompanyService },
        NzNotificationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockCompanyService = TestBed.inject(CompanyService) as MockCompanyService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display ads correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    // Verificar que los anuncios se muestran correctamente en la plantilla
    const adsElements = compiled.querySelectorAll('.child');
    expect(adsElements.length).toBe(2);
    expect(adsElements[0].querySelector('h2').textContent).toContain(
      'Service 1'
    );
    expect(adsElements[1].querySelector('h2').textContent).toContain(
      'Service 2'
    );
  });

  it('should call deletedAd and show notification on ad delete', fakeAsync(() => {
    spyOn(component, 'getAllAdsByUserId').and.callThrough();
    spyOn(mockCompanyService, 'deletedAd').and.callThrough();
    spyOn(component['notification'], 'success').and.callThrough();

    component.deletedAd(1);
    tick(); // Simula la finalización de las operaciones asíncronas

    // Mueve la notificación en el tiempo para que el temporizador del test se ejecute
    flush();

    fixture.detectChanges();

    expect(mockCompanyService.deletedAd).toHaveBeenCalledWith(1);
    expect(component['notification'].success).toHaveBeenCalledWith(
      'SUCCESS',
      `Se elimino correctamente!`,
      { nzDuration: 5000 }
    );
    expect(component.getAllAdsByUserId).toHaveBeenCalled();
  }));
});
