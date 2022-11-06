import { users } from '../models/users';
import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middlefun/authorization';

dotenv.config();
const secret = process.env.secret as string;
const User = new users();

const createNew = async (req: Request, res: Response) => {
  const first = req.body.firstName;
  const last = req.body.lastName;
  const password = req.body.password;
  try {
    const add = await User.createNew(first, last, password);
    const token = jwt.sign({ user: add }, secret);
    res.json(token);
  } catch (err) {
    return res.send('can\'t create user');
  }
};
const view = async (req: Request, res: Response) => {
  try {
    const insert = await User.view();
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};
const showById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const insert = await User.showById(id);
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};
const userhandler = (app: express.Application) => {
  app.post('/users/createNew', createNew);
  app.get('/users/showById/:id', verifyAuthToken, showById); // need to create user to have access to this route.
  app.get('/users/view', verifyAuthToken, view); };
export default userhandler;









