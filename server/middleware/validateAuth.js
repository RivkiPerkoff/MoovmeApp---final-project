const { body, validationResult } = require('express-validator');

// בדיקות להרשמה
const validateRegister = [
  body('username').notEmpty().withMessage('שם משתמש נדרש'),
  body('email').isEmail().withMessage('יש להזין כתובת מייל תקינה'),
  body('password')
    .isLength({ min: 6 }).withMessage('הסיסמה חייבת להכיל לפחות 6 תווים'),
  body('user_type').isIn(['user', 'admin']).withMessage('סוג משתמש לא חוקי'),

  // שלב סופי – בדיקה אם יש שגיאות
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'שדות לא תקינים', errors: errors.array() });
    }
    next();
  }
];

// בדיקות להתחברות
const validateLogin = [
  body('email').isEmail().withMessage('כתובת מייל לא תקינה'),
  body('password').notEmpty().withMessage('יש להזין סיסמה'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'שדות לא תקינים', errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateRegister,
  validateLogin
};
