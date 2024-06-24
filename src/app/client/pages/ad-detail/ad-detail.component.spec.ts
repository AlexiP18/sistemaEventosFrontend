import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDetailComponent } from './ad-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

fdescribe('AdDetailComponent', () => {
  let component: AdDetailComponent;
  let fixture: ComponentFixture<AdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdDetailComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        NzNotificationModule,
        NzButtonModule,
        NzFormModule,
        FormsModule,
        NzDatePickerModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { adId: '123' }, // Proveer datos mock para snapshot.params
            },
            params: of({ adId: '123' }), // También puedes usar esto si necesitas el observable
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ad details correctly', () => {
    // Simular valores para guardar
    component.ad = {
      serviceName: 'Servicio de Ejemplo',
      price: 100,
      description: 'Descripción del servicio',
      companyName: 'Nombre de la Empresa',
      // Otros campos necesarios para tus pruebas
    };

    // Simular valores del formulario
    component.validateForm.patchValue({
      bookDate: new Date(), // Aquí puedes simular una fecha u otro valor según sea necesario
      // Otros campos del formulario si los tienes
    });

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(
      component.ad.serviceName
    );
    expect(compiled.querySelector('h5:nth-of-type(1)').textContent).toContain(
      component.ad.price
    );
    expect(compiled.querySelector('h5:nth-of-type(2)').textContent).toContain(
      component.ad.description
    );
    expect(compiled.querySelector('h5:nth-of-type(2)').textContent).toContain(
      component.ad.companyName
    );
  });
});
