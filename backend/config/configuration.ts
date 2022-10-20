import 'dotenv/config';
export default () => ({
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
});
