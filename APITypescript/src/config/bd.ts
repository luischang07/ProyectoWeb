import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config()

export const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PW,
    multipleStatements: false
});