import express from 'express';
import { prisma } from '../db/db';

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
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

router.post('/sign-in', (req, res) => {
  res.send('Get URL');
});

module.exports = router;
