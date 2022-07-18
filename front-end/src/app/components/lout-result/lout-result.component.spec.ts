import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoutResultComponent } from './lout-result.component';

describe('LoutResultComponent', () => {
  let component: LoutResultComponent;
  let fixture: ComponentFixture<LoutResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoutResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoutResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
