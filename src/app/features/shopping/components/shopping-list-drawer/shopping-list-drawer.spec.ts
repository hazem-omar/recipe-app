import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListDrawer } from './shopping-list-drawer';

describe('ShoppingListDrawer', () => {
  let component: ShoppingListDrawer;
  let fixture: ComponentFixture<ShoppingListDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
