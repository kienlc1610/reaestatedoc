import ItemsController from '../controller/ItemsController';
import { IRouter, Router } from 'express';
import { validate } from '../middlewares/validation.middleware';
import { Item } from '../entity/Item';

const router: IRouter = Router();

router.get('', ItemsController.getAllItems);

router.post('', validate(Item), ItemsController.createNewItem);

router.get('/:id', ItemsController.getItemById);

router.put('/:id', validate(Item), ItemsController.updateItemById);

router.delete('/:id', ItemsController.softDeleteItemById);

export default router;
