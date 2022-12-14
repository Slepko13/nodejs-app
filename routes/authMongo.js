const express = require('express');
const { check, body } = require('express-validator');
const User = require('../models/userMongo');

const router = express.Router();

const authController = require('../controllers/authMongo');

router.get('/login', authController.getLogin);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and letters and at least 5 characters '
    )
      .isLength({
        min: 5,
      })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email already exist');
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and letters and at least 5 characters '
    )
      .isLength({
        min: 5,
      })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have no match');
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
