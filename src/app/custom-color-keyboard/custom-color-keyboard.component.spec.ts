import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColorKeyboardComponent } from './custom-color-keyboard.component';

describe('CustomColorKeyboardComponent', () => {
  let component: CustomColorKeyboardComponent;
  let fixture: ComponentFixture<CustomColorKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomColorKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColorKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
