import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ where: { userId: req.user.id } });

        if (!cart) cart = await Cart.create({ userId: req.user.id });

        const existing = await CartItem.findOne({ where: { cartId: cart.id, productId } });

        if (existing) {
        existing.quantity += quantity;
        await existing.save();
        } else {
        await CartItem.create({ cartId: cart.id, productId, quantity });
        }

        res.json({ message: 'Added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const viewCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
        where: { userId: req.user.id },
        include: { model: CartItem, include: Product },
        });
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        await CartItem.destroy({ where: { cartId: cart.id, productId } });
        res.json({ message: 'Removed from cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        await CartItem.destroy({ where: { cartId: cart.id } });
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };