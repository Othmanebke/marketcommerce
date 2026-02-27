// Express routes for users
import { Router } from 'express';
const router = Router();

// GET /users
router.get('/', (req, res) => {
  // ...fetch users...
  res.json([]);
});

// GET /users/:id
router.get('/:id', (req, res) => {
  // ...fetch user by id...
  res.json({});
});

export default router;
