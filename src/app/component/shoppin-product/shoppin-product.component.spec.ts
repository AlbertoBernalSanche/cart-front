import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinProductComponent } from './shoppin-product.component';

describe('ShoppinProductComponent', () => {
  let component: ShoppinProductComponent;
  let fixture: ComponentFixture<ShoppinProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
