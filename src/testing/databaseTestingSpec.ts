import { orders } from '../models/orders';
import { products } from '../models/products';
import { users } from '../models/users';
const product = new products();
const user = new users();
const order = new orders();
describe('tesing the products table actions', () => {
  it('tests the the return after inserting data ', async () => {
    const products = await product.add('maryam', 200);
    expect(products[0].id).toEqual(1); 
  
  });
  it('tests the existence of the function ', async () => {
    const products = await product.view();
    expect(products[0].id).toEqual(1);
  });
  it('tests the existence of the function ', async () => {
    const products = await product.showById(1);
    expect(products[0].id).toEqual(1);
  });
});


describe('tesing the users table actions', () => {
  it('tests the the return after creating user ', async () => {
    const users = await user.createNew('maryam', 'victor', 'maryam123');
    expect(users[0].id).toEqual(1);
  });
  it('tests the existence of the function', async () => {
    const users = await user.view();
    expect(users[0].id).toEqual(1);
  });
  it('tests the existence of the function ', async () => {
    const users = await user.showById(1);
    expect(users[0].id).toEqual(1);
  });
});


describe('tesing the orders table actions', () => {
  it('tests the existence of the function', async () => {
    const orders = await order.createNew('active', 1);
    expect(orders[0].id).toEqual(1);
  });
  it('tests the existence of the function', async () => {
    const orders = await order.find(1);
    expect(orders[0].id).toEqual(1);
  });
  it('tests the existence of the function ', async () => {
    const orders = await order.addProduct(1, 1, 1);
    expect(orders[0].id).toEqual(1);
  });
  it('tests the existence of the function ', async () => {
    const orders = await order.showById(1);
    expect(orders[0].id).toEqual(1);
  });
});







