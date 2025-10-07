import axios from 'axios';

const BASE_URL = process.env.PAYCHANGU_BASE_URL || 'https://api.paychangu.com';
const API_KEY = process.env.PAYCHANGU_API_KEY;

// Initiate Payment (Simulation)
export const initiatePayment = async (order, user) => {
    try {
        const txRef = `TX-${Date.now()}`; // Unique reference per transaction

        const paymentData = {
        amount: order.totalAmount.toString(), // PayChangu expects string
        currency: 'MWK',
        tx_ref: txRef,
        first_name: user.username || 'Test',
        email: user.email || 'test@example.com',
        callback_url: `http://localhost:5000/payment/callback/${order.id}`, // IPN
        return_url: `http://localhost:3000/payment/cancelled`,
        meta: [{ orderId: order.id }],
        customization: {
            title: 'Agrimarket Payment',
            description: 'Payment for your order',
        },
        };

        const response = await axios.post(`${BASE_URL}/payment`, paymentData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        });

        return response.data; // This contains checkout_url for redirect
    } catch (error) {
        console.error('Payment initiation failed:', error.response?.data || error.message);
        throw new Error('Payment initiation failed');
    }
};
