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
  constructor(message = 'Dados da requisição inválidos.') {
    super(message, 400);
  }
}

class AuthenticationError extends HttpException {
  constructor(message = 'Falha na autenticação.') {
    super(message, 401);
  }
}

class AuthorizationError extends HttpException {
  constructor(message = 'Você não tem permissão para acessar este recurso.') {
    super(message, 403);
  }
}

class NotFoundError extends HttpException {
  constructor(message = 'Recurso não encontrado.') {
    super(message, 404);
  }
}

class ConflictError extends HttpException {
  constructor(message = 'Conflito de recurso.') {
    super(message, 409);
  }
}

class ValidationError extends HttpException {
  constructor(message = 'Falha na validação dos dados.') {
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
