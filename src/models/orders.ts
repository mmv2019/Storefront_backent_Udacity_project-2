import client from '../database';
type order = [
  {
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
  }
];
type addorder = [
  {
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
  }
];
export class orders {
   async addProduct(
    productId: number,
    orderId: number,
    quantity: number
  ): Promise<order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders_products (quantity,order_id,product_id) VALUES ($1,$2,$3)  RETURNING id , quantity , order_id, product_id';
      const res = await connection.query(sql, [quantity, orderId, productId]);
      const order = res.rows;
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`unable to create order ${err}`);
    }
  }
    async createNew(status: string, userId: number): Promise<order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING id,status,user_id ';
      const res = await connection.query(sql, [status, userId]);
      const order = res.rows;
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`unable to createNew order ${err}`);
    }
  }
   async showById(userId: number): Promise<order> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id WHERE order_id = $1';
      const res = await connection.query(sql, [userId]);
      const order = res.rows;
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`can't get orders_products ${err}`);
    }
  }
    async find(userId: number): Promise<order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = $1';
      const res = await connection.query(sql, [userId]);
      const order = res.rows;
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`can't get orders ${err}`);
    }
  }
}






