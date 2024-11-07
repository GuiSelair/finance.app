import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function captureErrors(err: Error, request: Request, response: Response, _: NextFunction){
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return response.status(400).json({
      status: 'validation-error',
      message: `${err?.issues?.[0].path} - ${err?.issues?.[0]?.message}` || err,
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
