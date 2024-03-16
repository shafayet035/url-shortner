import express from 'express';
import { db } from '..';
import { urls } from '../db/schema/urls';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
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
});

router.get('/:slug', async (req, res) => {
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
});

module.exports = router;
