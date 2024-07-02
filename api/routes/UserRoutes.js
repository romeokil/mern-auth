import express from 'express'
import { test,updateUser,deleteUser } from '../controller/UserController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router=express.Router();

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);

export default router;