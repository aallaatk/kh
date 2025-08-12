import express from 'express';
import { body } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Only accessible by server-side/admin tools, not exposed in public API docs or frontend
router.post('/create-admin', [
 
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], async (req, res) => {
  // You should add authentication here to restrict access (e.g., check a secret header or admin session)
  const errors = body('email').isEmail().run(req);
  if (!errors.isEmpty && errors.isEmpty instanceof Function ? !errors.isEmpty() : false) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role: 'Admin' });
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
