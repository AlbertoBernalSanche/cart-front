import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartClientComponent } from './shopping-cart-client.component';

describe('ShoppingCartClientComponent', () => {
  let component: ShoppingCartClientComponent;
  let fixture: ComponentFixture<ShoppingCartClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
