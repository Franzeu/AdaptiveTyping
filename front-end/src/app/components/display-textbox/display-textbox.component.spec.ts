import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTextboxComponent } from './display-textbox.component';

describe('DisplayTextboxComponent', () => {
  let component: DisplayTextboxComponent;
  let fixture: ComponentFixture<DisplayTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
