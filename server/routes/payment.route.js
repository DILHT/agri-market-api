import express from 'express';
import { initiatePayment } from '../services/payment.services.js';
import { Order } from '../models/order.model.js';
import User from '../models/user.model.js';

const router = express.Router();

// Initiate Payment for an Order
router.post('/pay/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const user = await User.findByPk(order.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const payment = await initiatePayment(order, user);

        res.json({
        message: 'Payment initiated successfully',
        checkoutUrl: payment.checkout_url, // redirect frontend here
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // Callback endpoint
    router.get('/callback/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.query; // PayChangu returns status and tx_ref

    try {
        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).send('Order not found');

        if (status === 'successful') {
        order.status = 'Paid';
        await order.save();
        res.send('Payment successful! You can close this window.');
        } else {
        order.status = 'Failed';
        await order.save();
        res.send('Payment failed or cancelled.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error handling payment callback');
    }
});

export default router;
