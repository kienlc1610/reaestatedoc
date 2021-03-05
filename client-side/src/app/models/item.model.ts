export interface ItemModel {
  id: number;
  name: string;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export enum ItemActionModes {
  CREATE = 'create',
  EDIT = 'edit',
}
