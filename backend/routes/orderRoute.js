import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features 
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);

// User Features 
orderRouter.post('/userorders',authUser, userOrders);


export default orderRouter