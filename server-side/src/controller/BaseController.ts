import { Response } from 'express';
import ResultHandler from '../models/ResultHandler';

export interface BaseControllerI {
  responser: ResultHandler;
}

export class BaseController {
  createResultHandler(res: Response): ResultHandler {
    return new ResultHandler(res);
  }
}
