import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaileletrictComponent } from './detaileletrict.component';

describe('DetaileletrictComponent', () => {
  let component: DetaileletrictComponent;
  let fixture: ComponentFixture<DetaileletrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaileletrictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaileletrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
