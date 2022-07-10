import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinFrontPageComponent } from './lin-front-page.component';

describe('LinFrontPageComponent', () => {
  let component: LinFrontPageComponent;
  let fixture: ComponentFixture<LinFrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinFrontPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinFrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
