import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauteComponent } from './beaute.component';

describe('BeauteComponent', () => {
  let component: BeauteComponent;
  let fixture: ComponentFixture<BeauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeauteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
