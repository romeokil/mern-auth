import express from 'express'
import { test,updateUser } from '../controller/UserController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router=express.Router();

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser);

export default router;