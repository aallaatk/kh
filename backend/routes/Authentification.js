import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import handleValidation from '../middlewares/handleValidation.js';

const router = express.Router();

// Validation middleware for register
const registerValidation = [

  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['Candidate', 'Recruiter']).withMessage('Invalid role')
  // No profile fields required at signup
];

// Validation middleware for login
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, handleValidation, register);
router.post('/login', loginValidation, handleValidation, login);

export default router;