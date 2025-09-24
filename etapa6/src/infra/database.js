import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './db/schema.js'; // Importamos nosso schema

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Criamos a instância do Drizzle, passando o pool e o schema
const db = drizzle(pool, { schema });

export default db;