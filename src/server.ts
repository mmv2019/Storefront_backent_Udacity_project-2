import express from 'express';
import bodyParser from 'body-parser';
import productHandler from './handlers/products';
import userhandler from './handlers/users';
import orderHandler from './handlers/orders';
const app: express.Application = express();
const address = '0.0.0.0:3S000';

app.use(bodyParser.json());
orderHandler(app);
userhandler(app);
productHandler(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;







