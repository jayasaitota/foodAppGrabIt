import express from 'express';
import UploadController from '../controllers/imageUpload.controller'; 


const router = express.Router();

router.post('/',UploadController.upload);

export default router;