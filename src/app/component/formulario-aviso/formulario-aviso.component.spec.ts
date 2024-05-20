import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioAvisoComponent } from './formulario-aviso.component';

describe('FormularioAvisoComponent', () => {
  let component: FormularioAvisoComponent;
  let fixture: ComponentFixture<FormularioAvisoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormularioAvisoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
