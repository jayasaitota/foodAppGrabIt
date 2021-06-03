import express from "express";

import CategoryController from "../controllers/category.controller";

import {isAllowed} from '../middleware/authenticate';

const router = express.Router();

//GET /api/categories
router.route('/').all(isAllowed).get(CategoryController.list);

//POST /api/categories
router.route('/').all(isAllowed).post(CategoryController.create);

//PATCH /api/categories/:categoryId
router.route('/:categoryId').all(isAllowed).patch(CategoryController.update);

//GET /api/categories/:categoryId
router.route('/:categoryId').all(isAllowed).get(CategoryController.get);

//DELETE /api/categories/:categoryId
router.route('/:categoryId').all(isAllowed).delete(CategoryController.remove);

/** Load category when API with categoryId route parameter is hit */
router.param("categoryId", CategoryController.load);

export default router;
