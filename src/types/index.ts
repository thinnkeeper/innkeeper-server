import { Response, Request } from 'express';

export type BasicRoute = {
  req: Request;
  res: Response;
};
