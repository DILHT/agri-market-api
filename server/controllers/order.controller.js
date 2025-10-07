import { Order } from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import { Cart } from '../models/cart.model.js';
import { CartItem } from '../models/cartItem.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
        where: { userId: req.user.id },
        include: { model: CartItem, include: Product },
        });
        if (!cart || !cart.CartItems.length)
        return res.status(400).json({ message: 'Cart is empty' });

        const total = cart.CartItems.reduce(
        (sum, item) => sum + item.Product.price * item.quantity,
        0
        );

        const order = await Order.create({ userId: req.user.id, totalAmount: total });

        for (const item of cart.CartItems) {
        await OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price,
        });
        }

        await CartItem.destroy({ where: { cartId: cart.id } }); // empty cart
        res.json({ message: 'Order created', orderId: order.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
        where: { userId: req.user.id },
        include: { model: OrderItem, include: Product },
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
