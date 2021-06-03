import express from 'express';

import UserRoutes from './user.route';
import CategoryRoutes from './category.route';
import IndexRoutes from './item.route';
import UploadRoutes from './upload.route';

const router = express.Router();

//Mount User routues to /api/users
router.use('/users',UserRoutes)

//Mount User routues to /api/categories
router.use('/categories',CategoryRoutes)

//Mount User routues to /api/items
router.use('/items',IndexRoutes)

//Mount User routues to /api/upload
router.use('/upload',UploadRoutes)

export default router

