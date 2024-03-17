import express from 'express';
import { createUrl, getUrl } from '../controllers/url';

const router = express.Router();

router.post('/create', createUrl);

router.get('/:slug', getUrl);

module.exports = router;
