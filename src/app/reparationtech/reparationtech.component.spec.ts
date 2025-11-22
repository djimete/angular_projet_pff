import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationtechComponent } from './reparationtech.component';

describe('ReparationtechComponent', () => {
  let component: ReparationtechComponent;
  let fixture: ComponentFixture<ReparationtechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReparationtechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparationtechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
