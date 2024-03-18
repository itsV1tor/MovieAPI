import { Router } from 'express';
import userRoutes from './user.routes';
import movieRoutes from './movie.routes'

const router = Router();

router.use('/user', userRoutes);
router.use('/movie', movieRoutes);

export default router;
