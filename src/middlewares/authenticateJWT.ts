import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export default (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("Authorization")?.replace("Bearer ", "");

  if (!token) 
    return response.sendStatus(401);

  const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
  (request as CustomRequest).token = decoded;

   next();
};
