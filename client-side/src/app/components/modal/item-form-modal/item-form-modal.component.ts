import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemActionModes, ItemModel } from '@app/models/item.model';
import { ItemsService } from '@app/services/items.service';

@Component({
  templateUrl: './item-form-modal.component.html',
  styleUrls: ['./item-form-modal.component.scss'],
})
export class ItemFormModalComponent implements OnInit {
  itemInfo: ItemModel;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: ItemActionModes; itemId?: number },
    private itemsService: ItemsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemFormModalComponent>
  ) {}

  get isEditMode(): boolean {
    return this.data.mode === ItemActionModes.EDIT;
  }

  ngOnInit(): void {
    this.initForm();

    if (this.isEditMode && this.data.itemId) {
      this.itemsService
        .getItemById(this.data.itemId)
        .subscribe((data: ItemModel) => {
          this.form.patchValue(data);
        });
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', []],
      category: ['', []],
      price: [0, []],
    });
  }

  handleSaveItemInfo(): void {
    const rawVal = this.form.getRawValue();

    if (!this.isEditMode) {
      this.itemsService.createNewItem(rawVal).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.itemsService
        .updateItemById(this.data.itemId, rawVal)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }
}
