import client from '../database';

export type product = [
  {
    id: number;
    name: string;
    price: number;
  }
];

export class products {
  async add(name: string, price: number): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING id , name , price';
      const res = await conn.query(sql, [name, price]);
      const product = res.rows;
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can't create product ${err}`);
    }
  }

  async showById(id: number): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const res = await conn.query(sql, [id]);
      const product = res.rows;
      conn.release(product);
      return product;
    } catch (err) {
      throw new Error(`can't show  product ${err}`);
    }
  }

  async view(): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const res = await conn.query(sql);
      const product = res.rows;
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`can't show  products ${err}`);
    }
  }
}
