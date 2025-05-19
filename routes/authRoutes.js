import express from 'express';
import { registerController } from '../controllers/registerController.js';
import upload from '../middlewares/uploadConfig.js';

const router = express.Router()

router.post('/register', upload.single('avatar'), registerController)

export default router