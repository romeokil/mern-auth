import express from 'express'
import { signup } from '../controller/AuthController.js';
import { signin } from '../controller/AuthController.js';

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);

export default router;