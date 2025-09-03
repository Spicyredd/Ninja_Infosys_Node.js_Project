import { Response } from 'express';

interface Meta {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
}

export const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
  meta?: Meta
) => {
  const response: { success: boolean; data: any; meta?: Meta } = {
    success: true,
    data,
  };
  if (meta) {
    response.meta = meta;
  }
  return res.status(statusCode).json(response);
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: object
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: code || `GNS-${statusCode}`,
      message,
      details,
    },
  });
};