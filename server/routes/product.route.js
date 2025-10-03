import express from 'express';
import {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Protected/admin routes
router.post('/',authenticate,authorize('farmer'), createProduct);
router.put('/:id',authenticate,authorize('farmer'), updateProduct);
router.delete('/:id',authenticate,authorize('farmer'), deleteProduct);

export default router;
