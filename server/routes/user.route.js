import express from 'express';

import UserController from '../controllers/user.controller';

const router = express.Router();

// POST '/api/users/add-user => Create User'
router.route('/add-user').post(UserController.create)

// POST '/api/users/login'
router.route('/login').post(UserController.login)


export default router;