import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Item } from '../entity/Item';
import { BaseController } from './BaseController';
import { ERROR_CODES } from '../shared/Constants';

class ItemsController extends BaseController {
  constructor() {
    super();
  }

  async getAllItems(req: Request, res: Response, next: NextFunction) {
    try {
      const itemRepository = getRepository(Item);
      const items = await itemRepository.find({ order: { createdAt: 'DESC' } });

      return super.createResultHandler(res).success(items);
    } catch (e) {
      return next(e);
    }
  }

  async getItemById(req: Request, res: Response, next: NextFunction) {
    try {
      const itemRepository = getRepository(Item);
      const params = req.params;

      const foundItem = await itemRepository.findOne(params.id);

      return super.createResultHandler(res).success(foundItem);
    } catch (e) {
      return next(e);
    }
  }

  async createNewItem(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Item;
      const itemRepository = getRepository(Item);

      const createdItem = await itemRepository.save(body);

      return super.createResultHandler(res).success(createdItem);
    } catch (e) {
      return next(e);
    }
  }

  async updateItemById(req: Request, res: Response, next: NextFunction) {
    try {
      const itemRepository = getRepository(Item);
      const body = req.body as Item;
      const params = req.params;

      const foundItem = await itemRepository.findOne(params.id);

      if (foundItem) {
        await itemRepository.update({ id: foundItem.id }, { ...body });

        return super.createResultHandler(res).success();
      }

      throw new Error(ERROR_CODES.NOT_FOUND_ITEM);
    } catch (e) {
      return next(e);
    }
  }

  async softDeleteItemById(req: Request, res: Response, next: NextFunction) {
    try {
      const itemRepository = getRepository(Item);
      const params = req.params;
      const foundItem = await itemRepository.findOne(params.id);

      if (foundItem) {
        await itemRepository.softDelete({ id: foundItem.id });

        return super.createResultHandler(res).success();
      }

      throw new Error(ERROR_CODES.NOT_FOUND_ITEM);
    } catch (e) {
      return next(e);
    }
  }
}

export default new ItemsController();
