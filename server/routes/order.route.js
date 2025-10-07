import express from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { createOrder, getOrders } from '../controllers/order.controller.js';


const router = express.Router();

// order routes
router.post('/',authenticate,createOrder);
router.get('/',authenticate,getOrders);

export default router;