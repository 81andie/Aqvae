import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConcienciaComponent } from './info-conciencia.component';

describe('InfoConcienciaComponent', () => {
  let component: InfoConcienciaComponent;
  let fixture: ComponentFixture<InfoConcienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoConcienciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoConcienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
