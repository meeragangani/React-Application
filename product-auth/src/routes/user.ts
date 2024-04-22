// routes/user.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) return res.status(400).send('User already exists.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.send('User registered successfully.');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
  res.header('auth-token', token).send(token);
});

export default router;