import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesStoryComponent } from './species-story.component';

describe('SpeciesStoryComponent', () => {
  let component: SpeciesStoryComponent;
  let fixture: ComponentFixture<SpeciesStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeciesStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
