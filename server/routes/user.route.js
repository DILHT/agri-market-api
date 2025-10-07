import express from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { updateProfile } from '../controllers/user.controller.js';


const router = express.Router();

//user routes
router.patch('/profile', authenticate,updateProfile);

export default router;