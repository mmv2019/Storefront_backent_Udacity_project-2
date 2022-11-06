import Express from "express";
import { Response,Request } from "express";
import { products } from "../models/products";
import verifyAuthToken from '../middlefun/authorization';
const store = new products();

const ShowAll = async (req: Request, res: Response) => {
    try {
      const add = await store.view();
      return res.json(add);
    } catch (err) {
      res.status(500);
      return res.json("your error is"+err);
    }
  };

  const showById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const insert = await store.showById(id);
      return res.json(insert);
    } catch (err) {
      res.status(500);
      return res.json("your error is "+err);
    }
  };

  const createNew = async (req: Request, res: Response) => {
    const name = req.body.name;
    const price = parseInt(req.body.price);
  
    try {
        const insert = await store.add(name, price);
      return res.json(insert);
    } catch (err) {
      res.status(500);
      return res.json("your error is "+err);
    }
  };

  const productHandler = (app: Express.Application) => {
    app.get('/products/showAll', ShowAll);
    app.get('/products/showById/:id', showById);
    app.post('/products/createNew', verifyAuthToken, createNew); // need to create user to have access to this route.
  };
  export default productHandler;