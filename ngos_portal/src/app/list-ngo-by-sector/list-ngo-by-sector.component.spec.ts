import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNgoBySectorComponent } from './list-ngo-by-sector.component';

describe('ListNgoBySectorComponent', () => {
  let component: ListNgoBySectorComponent;
  let fixture: ComponentFixture<ListNgoBySectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNgoBySectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNgoBySectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
