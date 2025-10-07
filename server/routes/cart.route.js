import express from 'express';
import {
    addToCart,
    viewCart,
    removeFromCart,
    clearCart
} from '../controllers/cart.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const router = express.Router();

// cart routes
router.post('/add', authenticate, addToCart);
router.get('/', authenticate, viewCart);
router.delete('/remove/:productId', authenticate, removeFromCart);
router.delete('/clear', authenticate, clearCart);

export default router;