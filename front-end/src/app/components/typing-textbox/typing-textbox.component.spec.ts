import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingTextboxComponent } from './typing-textbox.component';

describe('TypingTextboxComponent', () => {
  let component: TypingTextboxComponent;
  let fixture: ComponentFixture<TypingTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingTextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
