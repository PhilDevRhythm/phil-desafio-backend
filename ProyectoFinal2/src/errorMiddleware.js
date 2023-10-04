import { httpResponse } from "./httpResponse.js";

const httpReso = new httpResponse();

export const errorMiddleware = (error, req, res, next) => {
  console.log(error.status);
  const status = error.statusCode || 500;
  httpReso.ServerError(res, error.message);
};
