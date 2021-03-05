import { ValidationError } from 'class-validator';
import { Response } from 'express';

export enum ResponserCode {
  SUCCESS = 0,
  ERROR = -1,
}

export interface Payload {
  code: number;
  data: any;
  message?: string;
  errors?: Array<ValidationError>;
}

export default class ResultHandler {
  private res!: Response;
  private payload: Payload = {
    code: ResponserCode.SUCCESS,
    data: null,
  };

  constructor(res: Response) {
    this.res = res;
  }

  success(data: any = null): void {
    this.payload.data = data;
    this.res.status(200).json(this.payload).end();
  }

  faild(error: Error): void {
    this.payload.code = ResponserCode.ERROR;
    this.payload.message = error.message;

    if (error instanceof Array && error[0] instanceof ValidationError) {
      this.payload.errors = error;
    }

    this.res.status(400).json(this.payload).end();
  }
}
