import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardStandardComponent } from './keyboard-standard.component';

describe('KeyboardStandardComponent', () => {
  let component: KeyboardStandardComponent;
  let fixture: ComponentFixture<KeyboardStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
