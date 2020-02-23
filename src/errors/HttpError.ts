import { AppError } from './../errors/AppError';

export class EmailTakenError extends AppError {
    constructor (message) {
      // Providing default message and overriding status code.
      super(message || 'Specified E-Mail is already taken', 409);
    }
  };