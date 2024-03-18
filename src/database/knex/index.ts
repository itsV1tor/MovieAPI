import { knex as knexBase } from 'knex';
import config from '../../../knexfile';

export const knex = knexBase(config.development);
