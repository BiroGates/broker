import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'sivt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  typeCast(field, next) {
    if (field.type === 'TINY') {
      const x = field.string() === '1';
      return x;
    }
    return next();
  }
});

export default pool;
