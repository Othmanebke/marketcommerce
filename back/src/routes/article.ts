// Express routes for articles
import { Router } from 'express';
const router = Router();

// GET /articles
router.get('/', (req, res) => {
  // ...fetch articles...
  res.json([]);
});

// GET /articles/:slug
router.get('/:slug', (req, res) => {
  // ...fetch article by slug...
  res.json({});
});

export default router;
