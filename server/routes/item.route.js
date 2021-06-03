import express from "express";

import ItemController from "../controllers/item.controller";

import {isAllowed} from '../middleware/authenticate';

const router = express.Router();

//GET /api/items
router.route('/').all(isAllowed).get(ItemController.list);

//POST /api/items
router.route('/').all(isAllowed).post(ItemController.create);

//PATCH /api/items/:itemId
router.route('/:itemId').all(isAllowed).patch(ItemController.update);

//GET /api/items/:itemId
router.route('/:itemId').all(isAllowed).get(ItemController.get);

//DELETE /api/items/:itemId
router.route('/:itemId').all(isAllowed).delete(ItemController.remove);

/** Load item when API with itemId route parameter is hit */
router.param("itemId", ItemController.load);

export default router;
