const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHENTORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL: 500,
};

export class httpResponse {
  Ok(res, data) {
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "success",
      error: data,
    });
  }
  NotFound(res, data) {
    return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Not Found",
        error: data,
      })
  }
  Unauthorized(res, data) {
    return res.status(httpStatus.UNAUTHENTORIZED).json({
        status: httpStatus.UNAUTHENTORIZED,
        message: "Unauthorized",
        error: data,
      })
  }
  Forbidden(res, data) {
    return res.status(httpStatus.FORBIDDEN).json({
        status: httpStatus.FORBIDDEN,
        message: "Error",
        error: data,
      })
  }
  ServerError(res, data) {
    return res.status(httpStatus.INTERNAL).json({
        status: httpStatus.INTERNAL,
        message: "success",
        data: data,
      })
  }
}
