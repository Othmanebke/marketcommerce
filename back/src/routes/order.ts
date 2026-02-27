// Express routes for orders
import { Router } from 'express';
const router = Router();

// GET /orders
router.get('/', (req, res) => {
  // ...fetch orders...
  res.json([]);
});

// GET /orders/:id
router.get('/:id', (req, res) => {
  // ...fetch order by id...
  res.json({});
});

export default router;
