import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildomestiqueComponent } from './detaildomestique.component';

describe('DetaildomestiqueComponent', () => {
  let component: DetaildomestiqueComponent;
  let fixture: ComponentFixture<DetaildomestiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaildomestiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaildomestiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
