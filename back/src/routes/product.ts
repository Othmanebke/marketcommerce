// Express routes for products
import { Router } from 'express';
const router = Router();

// GET /products
router.get('/', (req, res) => {
  // ...fetch products...
  res.json([]);
});

// GET /products/:id
router.get('/:id', (req, res) => {
  // ...fetch product by id...
  res.json({});
});

export default router;
