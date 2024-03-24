import express from 'express';
import { prisma } from '../db/db';

const router = express.Router();

router.post('/sign-in', async (req, res) => {
  const { email, name } = req.body;

  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUser)
      return res.status(400).json({
        message: 'User already exists',
      });

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(200).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
