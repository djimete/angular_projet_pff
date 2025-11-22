import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomestiqueComponent } from './domestique.component';

describe('DomestiqueComponent', () => {
  let component: DomestiqueComponent;
  let fixture: ComponentFixture<DomestiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomestiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomestiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
