import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursdomicileComponent } from './coursdomicile.component';

describe('CoursdomicileComponent', () => {
  let component: CoursdomicileComponent;
  let fixture: ComponentFixture<CoursdomicileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursdomicileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursdomicileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
