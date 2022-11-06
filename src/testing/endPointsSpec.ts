import app from '../server';
import supertest from 'supertest';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.secret as string;
const endRoutes = supertest(app);

describe('test the endRoutes of the products ', () => {
  it('tests the "product/show" endpoint response', async () => {
    const resp = await endRoutes.get('/products/showById/1');
    expect(resp.status).toEqual(200);
  });
  it('tests the product showAll endpoint response', async () => {
      const resp = await endRoutes.get('/products/showAll');
    expect(resp.status).toEqual(200);
  });
  it('tests the create new product', async () => {
       const user = {};
    const token = Jwt.sign({ user: user }, secret);
    const resp = await endRoutes
      .post('/products/createNew')
      .auth(token, { type: 'bearer' })
      .send({ name: 'ay haga', price: 155 });
    expect(resp.status).toEqual(200);
  });
});
describe('test the endRoutes of the users ', () => {
  it('tests the create user endpoint response', async () => {
    const resp = await endRoutes.post('/users/createNew');
    expect(resp.status).toEqual(200);
  });
  it('gets the read endpoint', () => {
    const user = {};
    const token = Jwt.sign({ user: user }, secret);
    endRoutes
      .get(`/users/showById/1`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  it('tests the view users endpoint response', async () => {
    const user = {};
    const token = Jwt.sign({ user: user }, secret);
    const response = await endRoutes
      .get('/users/view')
      .auth(token, { type: 'bearer' });
    expect(response.status).toEqual(200);
  });
});


