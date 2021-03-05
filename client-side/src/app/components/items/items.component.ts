import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemActionModes, ItemModel } from '@app/models/item.model';
import { ItemsService } from '@app/services/items.service';
import { ItemFormModalComponent } from '../modal/item-form-modal/item-form-modal.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  datasource: MatTableDataSource<ItemModel> = new MatTableDataSource([]);
  displayedColumns: Array<string> = [
    'id',
    'name',
    'type',
    'category',
    'createdAt',
    'updatedAt',
    'more',
  ];
  itemActionModes = ItemActionModes;

  constructor(private itemsService: ItemsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems(): void {
    this.itemsService.getAllItems().subscribe((listItems) => {
      this.datasource = new MatTableDataSource(listItems);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  openItemFormDialog(mode = ItemActionModes.CREATE, id?: number): void {
    const dialog = this.dialog.open(ItemFormModalComponent, {
      data: {
        mode,
        itemId: id,
      },
      minWidth: '50%',
      minHeight: '30vh',
    });

    dialog.afterClosed().subscribe((isRefresh: boolean) => {
      if (isRefresh) {
        this.fetchItems();
      }
    });
  }

  deleteItem(id: number): void {
    this.itemsService.deleteItemById(id).subscribe(() => this.fetchItems());
  }
}
