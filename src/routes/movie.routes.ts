import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post('/:user_id', movieController.create);
movieRouter.put('/:user_id/:movie_id', movieController.update);
movieRouter.get('/:user_id', movieController.read);

export default movieRouter;
