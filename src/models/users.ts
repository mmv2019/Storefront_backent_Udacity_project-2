import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export type User = [
  {
    id: number;
    first_name: string;
    lastName: string;
    password: string;
  }
];
const papper = process.env.papper;
const salt = process.env.salt;

export class users {
  async createNew(first: string, last: string, password: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (first_name,lastName,password) VALUES ($1,$2,$3) RETURNING id,first_name , lastName , password';
      const hash = bcrypt.hashSync(
        password + papper,
        parseInt(salt as string) as number
      );
      const res = await conn.query(sql, [first, last, hash]);
      const user = res.rows;
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`can't create user ${err}`);
    }
  }
  async showById(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const res = await conn.query(sql, [id]);
      const product = res.rows;
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can't get users ${err}`);
    }
  }
   async view(): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const res = await conn.query(sql);
      const product = res.rows;
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can't get user ${err}`);
    }
  }
}







