import { NextFunction, Request, Response } from 'express';
import { firebaseAuth } from '../config/firebase';
import { prisma } from '../db/db';

export async function verifyOAuthToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.body.token);
  const token = req.body.token;

  if (!token) return res.status(401).send('Unauthorized');

  const user = await firebaseAuth.verifyIdToken(token);
  if (!user) return res.status(401).send('Unauthorized');

  const isExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!isExists) return res.status(401).send('Unauthorized');
  req.body.userId = isExists.id;

  next();
}
