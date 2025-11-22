import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounouComponent } from './nounou.component';

describe('NounouComponent', () => {
  let component: NounouComponent;
  let fixture: ComponentFixture<NounouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NounouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NounouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
