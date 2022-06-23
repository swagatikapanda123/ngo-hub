import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNgoComponent } from './register-ngo.component';

describe('RegisterNgoComponent', () => {
  let component: RegisterNgoComponent;
  let fixture: ComponentFixture<RegisterNgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
