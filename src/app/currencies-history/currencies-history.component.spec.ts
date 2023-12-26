import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesHistoryComponent } from './currencies-history.component';

describe('CurrenciesHistoryComponent', () => {
  let component: CurrenciesHistoryComponent;
  let fixture: ComponentFixture<CurrenciesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
