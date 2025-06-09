class HttpException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, new.target);
  }
}

class BadRequestError extends HttpException {
  constructor(message = 'Invalid request data.') {
    super(message, 400);
  }
}

class AuthenticationError extends HttpException {
  constructor(message = 'Authentication failed.') {
    super(message, 401);
  }
}

class AuthorizationError extends HttpException {
  constructor(message = 'You are not authorized to access this resource.') {
    super(message, 403);
  }
}

class NotFoundError extends HttpException {
  constructor(message = 'Resource not found.') {
    super(message, 404);
  }
}

class ConflictError extends HttpException {
  constructor(message = 'Resource conflict.') {
    super(message, 409);
  }
}

class ValidationError extends HttpException {
  constructor(message = 'Validation failed.') {
    super(message, 422);
  }
}

export {
  HttpException,
  BadRequestError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  ValidationError,
};
