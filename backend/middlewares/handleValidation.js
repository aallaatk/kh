import { validationResult } from 'express-validator';

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      path: err.param,
      message: err.msg
    }));
    return res.status(400).json({
      message: 'Please correct the highlighted fields.',
      errors: formattedErrors
    });
  }
  next();
};

export default handleValidation;
