import { AppError } from './../errors/AppError';

export class HttpError extends AppError {
    constructor (message: string, code: number) {
      // Providing default message and overriding status code.
      super(message, code);
    }
  };