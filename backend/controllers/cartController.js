import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";



const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Check if userId and itemId are provided
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        const userData = await userModel.findById(userId);
        const product = await productModel.findById(itemId);

        // Check if user and product exist
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Ensure cartData exists
        let cartData = userData.cartData || {};

        // Check if adding another unit exceeds available stock
        const currentQuantity = cartData[itemId]?.quantity || 0;
        if (currentQuantity + 1 > product.stock) {
            return res.status(400).json({ success: false, message: "Not enough stock available" });
        }

        // Create or update product data in cart
        const updatedProduct = {
            quantity: currentQuantity + 1,
            name: product.name,
            price: product.price,
            image: product.image, // Assuming product image is an array or string
        };

        // Update the cart with the product data
        cartData[itemId] = updatedProduct;

        // Update user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Item added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};




const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        if (!userId || !itemId || quantity < 0) {
            return res.status(400).json({ success: false, message: "Invalid request parameters" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        cartData[itemId] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};


const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export { addToCart, updateCart, getUserCart };
