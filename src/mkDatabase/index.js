import Knex from 'knex';
import knexfile from '../../knexfile.js'

const knex = Knex(knexfile.development);

export default knex;