import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoslistComponent } from './ngoslist.component';

describe('NgoslistComponent', () => {
  let component: NgoslistComponent;
  let fixture: ComponentFixture<NgoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
