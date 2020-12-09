import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingProductClientComponent } from './shopping-product-client.component';

describe('ShoppingProductClientComponent', () => {
  let component: ShoppingProductClientComponent;
  let fixture: ComponentFixture<ShoppingProductClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingProductClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingProductClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
