import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaAvisosComponent } from './lista-avisos.component';

describe('ListaAvisosComponent', () => {
  let component: ListaAvisosComponent;
  let fixture: ComponentFixture<ListaAvisosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaAvisosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
