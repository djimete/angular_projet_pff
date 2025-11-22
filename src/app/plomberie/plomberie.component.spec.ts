import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlomberieComponent } from './plomberie.component';

describe('PlomberieComponent', () => {
  let component: PlomberieComponent;
  let fixture: ComponentFixture<PlomberieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlomberieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlomberieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
