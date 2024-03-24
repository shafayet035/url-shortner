import express from 'express';
import { createUrl, getUrl } from '../controllers/url';
import { verifyOAuthToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/create', verifyOAuthToken, createUrl);

router.get('/:slug', getUrl);

module.exports = router;
