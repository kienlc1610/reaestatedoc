import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemActionModes, ItemModel } from '@app/models/item.model';
import { ItemsService } from '@app/services/items.service';

@Component({
  selector: 'app-item-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class ItemInfoFormComponent implements OnInit {
  @Input() itemForm: FormGroup;
  @Input() mode: ItemActionModes;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}
}
