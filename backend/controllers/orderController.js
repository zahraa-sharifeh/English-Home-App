import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { validationResult } from "express-validator"; // Optional, for validation
import productModel from "../models/productModel.js";


// placing orders using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        console.log('Received Order Data:', req.body);  // Log incoming data

        // Validate input
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate each item in the order
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid item format, items array is empty or not an array" });
        }

        // Prepare an array to hold order items with their details
        let orderItems = [];

        for (const item of items) {
            // Ensure item has both _id and quantity
            if (!item._id || !item.quantity) {
                return res.status(400).json({ success: false, message: "Invalid item format, missing itemId or quantity" });
            }

            const productId = item._id;
            const quantity = item.quantity;

            // Fetch the product to check stock and get product details
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
            }

            // Check stock availability
            if (product.stock < quantity) {
                return res.status(400).json({ success: false, message: `Not enough stock for ${product.name}` });
            }

            // Add product details to item
            const orderItem = {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,  // Assuming `image` is an array of image URLs
                quantity,
            };

            // Decrement stock by the quantity ordered
            product.stock -= quantity;
            await product.save();

            // Add the item with all details to the order items array
            orderItems.push(orderItem);
        }

        // Proceed with order creation
        const orderData = {
            userId,
            items: orderItems, // Use the updated orderItems array
            address,
            amount,
            paymentMethod: "COD", // Assuming Cash on Delivery
            payment: false,
            date: new Date(),  // Using Date() for a more human-readable timestamp
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Empty the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

  



// placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    
};

// display all orders for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate userId
        if (!userId) {
            return res.json({ success: false, message: "Missing userId" });
        }

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate input
        if (!orderId || !status) {
            return res.json({ success: false, message: "Missing orderId or status" });
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Update the status without checking if the status is in order
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
