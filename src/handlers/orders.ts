import { Request, Response } from 'express';
import { orders } from '../models/orders';
import express from 'express';
import jwt from 'jsonwebtoken';
type cart = {
  user: [
    {
      id: number;
      first_name: string;
      lastname: string;
      password: string;
    }
  ];
  iat: number;
};
type user = [
  {
    id: number;
    first_name: string;
    lastname: string;
    password: string;
  }
];
const cart = new orders();
const add = async (req: Request, res: Response) => {
  const productId = parseInt(req.body.productId) as number;
  const quantity = parseInt(req.body.quantity) as number;
  try {
    const authorize = req.headers.authorization as string;
    const token = authorize.split(' ')[1];
    const verifytoken = jwt.verify(token, process.env.secret as string);
    const store = verifytoken as cart;
    const id = store.user[0].id;
    const ShowAll = await cart.find(id);
    if (ShowAll.length) {
      try {
        const add = await cart.addProduct(productId, ShowAll[0].id, quantity);
        return res.json(add);
      } catch (err) {
        res.status(400);
        return res.json(err);
      }
    } else {
      console.log('createNew order list first');
      res.send('createNew order list first');
      res.status(500);
    }
  } catch (error) {
    res.status(401);
    res.send('invaled token');
    return;
  }
};
const createNew = async (req: Request, res: Response) => {
  const status = req.body.status;
  try {
    const authorize = req.headers.authorization as string;
    const token = authorize.split(' ')[1];
    const verifytoken = jwt.verify(token, process.env.secret as string);
    const store = verifytoken as cart;
    const admin: user = store.user;
    const id = admin[0].id;
    try {
      const add = await cart.createNew(status, id);
      return res.json(add);
    } catch (err) {
      res.status(400);
      return res.json(err);
    }
  } catch (error) {
    res.status(401);
    res.send('invaled token');
    return;
  }
};
const ShowAll = async (req: Request, res: Response) => {
  try {
    const authorize = req.headers.authorization as string;
    const token = authorize.split(' ')[1];
    const verifytoken = jwt.verify(token, process.env.secret as string);
    const store = verifytoken as cart;
    const id = store.user[0].id;
    const ShowAlls = await cart.find(id);
    try {
      const ShowAll = await cart.showById(ShowAlls[0].id);
      return res.json(ShowAll);
    } catch (err) {
      return res.json(err);
    }
  } catch (error) {
    res.status(401);
    res.send('invaled token');
    return;
  }
};
const ordersHandler = (app: express.Application) => {
  app.post('/orders/createNew', createNew);
  app.post('/orders/add', add);
  app.get('/orders/ShowAll', ShowAll);
};
export default ordersHandler;