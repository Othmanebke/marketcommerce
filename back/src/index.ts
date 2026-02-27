// Point d'entrée Express
import express from 'express';
const app = express();

app.use(express.json());

// ...routes à ajouter...

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});
