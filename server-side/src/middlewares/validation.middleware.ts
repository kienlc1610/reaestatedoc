import * as express from 'express';
import { Validator } from 'class-validator';
import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import ResultHandler from '../models/ResultHandler';

// Because all type information is erased in the compiled
// JavaScript, we can use this clever structural-typing
// work-around enabled by TypeScript to pass in a class
// to our middleware.
type Constructor<T> = { new (): T };

// This function returns a middleware which validates that the
// request's JSON body conforms to the passed-in type.
export function validate<T>(type: Constructor<T>): express.RequestHandler {
  let validator = new Validator();

  return (req, res, next) => {
    let input: T = plainToClass(type, req.body);

    let errors = validator.validateSync(input as Object);
    if (errors.length > 0) {
      next(errors);
    } else {
      console.log('Input', input);
      req.body = input;
      next();
    }
  };
}

// This middleware handles the case where our validation
// middleware says the request failed validation. We return
// those errors to the client here.
export function validationError(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    const responser = new ResultHandler(res);

    return responser.faild(err);
  } else {
    next(err);
  }
}
