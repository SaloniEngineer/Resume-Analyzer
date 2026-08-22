const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route       POST /api/auth/register
 * @description Register a new user
 * @access      Public
 */
authRouter.post('/register', authController.registerUserController);

/**
 * @route       POST /api/auth/login
 * @description Login a user
 * @access      Public
 */
authRouter.post('/login', authController.loginUserController);

/**
 * @route       POST /api/auth/logout
 * @description Logout a user
 * @access      Private
 */
authRouter.post('/logout', authMiddleware.authUser, authController.logoutUserController);

/**
 * @route       GET /api/auth/get-me
 * @description Get currently authenticated user's details
 * @access      Private
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController);

module.exports = authRouter;