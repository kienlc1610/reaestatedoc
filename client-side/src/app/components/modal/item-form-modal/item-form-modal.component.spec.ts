import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormModalComponent } from './item-form-modal.component';

describe('ItemFormModalComponent', () => {
  let component: ItemFormModalComponent;
  let fixture: ComponentFixture<ItemFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
