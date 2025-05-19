import express from 'express';
import { registerController } from '../controllers/registerController.js';
import upload from '../middlewares/uploadConfig.js';
import { loginController } from '../controllers/loginController.js';

const router = express.Router()

router.post('/register', upload.single('avatar'), registerController)
router.post('/login', loginController)

export default router