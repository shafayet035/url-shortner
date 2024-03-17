import { Request, Response } from 'express';
import { db } from '..';
import { urls } from '../db/schema/urls';
import { eq } from 'drizzle-orm';

export async function createUrl(req: Request, res: Response) {
  try {
    if (!req.body.url)
      return res.status(402).json({
        message: 'Please provide a valid URL and slug',
      });

    await db.insert(urls).values({
      url: req.body.url,
      slug: req.body.slug,
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
    const result = await db
      .select()
      .from(urls)
      .where(eq(urls.slug, slug))
      .execute();
    if (!result) res.status(404).send('Not Found');
    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}
