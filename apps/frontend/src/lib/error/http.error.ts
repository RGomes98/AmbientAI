class HttpException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, new.target);
  }

  static from(err: unknown) {
    if (err instanceof HttpException) {
      return err;
    }

    if (err instanceof Error) {
      return new InternalServerError(err.message);
    }

    return new InternalServerError();
  }
}

class BadRequestError extends HttpException {
  constructor(message = 'Dados da requisição inválidos.') {
    super(message, 400);
  }
}

class AuthenticationError extends HttpException {
  constructor(message = 'Falha na autenticação.') {
    super(message, 401);
  }
}

class InternalServerError extends HttpException {
  constructor(message = 'Falha na autenticação.') {
    super(message, 500);
  }
}

export { HttpException, BadRequestError, AuthenticationError, InternalServerError };
