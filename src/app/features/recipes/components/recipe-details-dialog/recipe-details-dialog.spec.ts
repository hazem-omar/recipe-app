import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsDialog } from './recipe-details-dialog';

describe('RecipeDetailsDialog', () => {
  let component: RecipeDetailsDialog;
  let fixture: ComponentFixture<RecipeDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetailsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
