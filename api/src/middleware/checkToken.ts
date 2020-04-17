import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import envConfig from 'config/env';

export default function (req: Request, res: Response, next: NextFunction) {
  const decoded =
    envConfig?.JWT_KEY &&
    jwt.verify(req.body.token, envConfig?.JWT_KEY, function (
      err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null,
      decoded: any
    ) {
      if (!decoded || err) {
        return res.status(401).json({ message: 'Check auth failed' });
      }
    });
  // @ts-ignore
  req.userData = decoded;
  next();
}