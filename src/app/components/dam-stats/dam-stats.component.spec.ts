import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamStatsComponent } from './dam-stats.component';

describe('DamStatsComponent', () => {
  let component: DamStatsComponent;
  let fixture: ComponentFixture<DamStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
