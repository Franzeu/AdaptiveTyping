import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinHeaderComponent } from './lin-header.component';

describe('LinHeaderComponent', () => {
  let component: LinHeaderComponent;
  let fixture: ComponentFixture<LinHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
