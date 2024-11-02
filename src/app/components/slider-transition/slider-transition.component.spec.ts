import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTransitionComponent } from './slider-transition.component';

describe('SliderTransitionComponent', () => {
  let component: SliderTransitionComponent;
  let fixture: ComponentFixture<SliderTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderTransitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
