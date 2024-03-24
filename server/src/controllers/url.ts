import { Request, Response } from 'express';
import { prisma } from '../db/db';

export async function createUrl(req: Request, res: Response) {
  if (!req.body.url)
    return res.status(402).json({
      message: 'Please provide a valid URL and slug',
    });

  try {
    const url = await prisma.url.create({
      data: {
        slug: req.body.slug,
        url: req.body.url,
        userId: req.body.userId,
      },
    });
    res.status(200).json({
      message: 'Successfully created the URL',
      shortUrl: `${process.env.CLIENT_URL}/${req.body.slug}`,
      longUrl: req.body.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

export async function getUrl(req: Request, res: Response) {
  try {
    const slug = req.params.slug;

    if (!slug)
      return res.status(402).json({ message: 'Please provide a valid slug' });

    const url = await prisma.url.findUnique({
      where: {
        slug,
      },
    });

    if (!url) return res.status(404).json({ message: 'URL not found' });
    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}
