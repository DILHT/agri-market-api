import express from 'express';
import {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';
// import { uploadImage } from '../controllers/upload.controller.js';
// import upload from '../../config/multerconfig.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Protected/admin routes
router.post('/', authenticate, authorizeRoles('farmer'), createProduct);
router.put('/:id', authenticate, authorizeRoles('farmer'), updateProduct);
router.delete('/:id',authenticate,authorizeRoles('farmer'), deleteProduct);

//product image
// router.post('/upload', authenticate, upload.single('image'), uploadImage);

export default router;
