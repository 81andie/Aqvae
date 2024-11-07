import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTipsComponent } from './info-tips.component';

describe('InfoTipsComponent', () => {
  let component: InfoTipsComponent;
  let fixture: ComponentFixture<InfoTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
