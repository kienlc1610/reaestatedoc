import { NextFunction, Request, Response } from 'express';
import { validationError } from './validation.middleware';

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Error handler!');

  if (err.stack) {
    console.error(err.stack);
  }

  // Handle validation errror
  validationError(err, req, res, next);

  return res
    .status(400)
    .json({
      message: err.message,
    })
    .end();
}
