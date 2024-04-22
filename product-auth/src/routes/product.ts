// routes/product.ts
import express from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import Product, { IProduct } from '../models/Product';

const router = express.Router();

interface JwtPayload {
  _id: string;
  iat: number;
}

function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
  return typeof payload === 'object' && 'iat' in payload;
}

router.get('/', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied.');

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as string | JwtPayload;

  if (isJwtPayload(decoded)) {
    const user = await User.findById(decoded._id);
    if (!user) return res.status(400).send('Invalid User.');

    const products = await Product.find({ user: user._id });
    res.send(products);
  }
});

router.post('/', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied.');

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as string | JwtPayload;

  if (isJwtPayload(decoded)) {
    const user = await User.findById(decoded._id);
    if (!user) return res.status(400).send('Invalid User.');

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      user: user._id,
    });

    await product.save();
    res.send(product);
  }
});

router.delete('/:id', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied.');

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as string | JwtPayload;

  if (isJwtPayload(decoded)) {
    const user = await User.findById(decoded._id);
    if (!user) return res.status(400).send('Invalid User.');

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!product) return res.status(404).send('Product not found.');

    res.send(product);
  }
});

export default router;