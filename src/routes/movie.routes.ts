import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post('/:user_id', movieController.create);

export default movieRouter;
