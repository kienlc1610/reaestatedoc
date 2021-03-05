import { Router } from 'express';
import itemsRoutes from './items.routes';

export default function () {
  const router = Router();

  router.use('/items', itemsRoutes);

  return router;
}
