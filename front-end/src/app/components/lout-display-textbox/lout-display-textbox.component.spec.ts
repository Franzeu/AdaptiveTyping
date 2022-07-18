import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoutDisplayTextboxComponent } from './lout-display-textbox.component';

describe('LoutDisplayTextboxComponent', () => {
  let component: LoutDisplayTextboxComponent;
  let fixture: ComponentFixture<LoutDisplayTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoutDisplayTextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoutDisplayTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
