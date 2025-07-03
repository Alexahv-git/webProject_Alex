// Default route: if user goes to '/', serve index.html
import express from 'express';
// Import the Express library to create a router
import { connection } from '../db/connection.js';

// Create a router object to define routes under /order
const router = express.Router();
// Handle POST requests to the base '/order' route
router.post('/', (req, res) => {
  console.log("✔ POST request received to /order");
  console.log("FORM DATA:", req.body);
  // Extract fields from the request body (sent from a form)
  const { fullName, email, phone, address, cart } = req.body;
  // Validate that all required fields are present and cart is not empty
  if (!fullName || !email || !phone || !address || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).send("Missing required fields or empty cart");
  }
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Insert customer and order info into the 'orders' table
  connection.query(
    `INSERT INTO orders (customer_name, email, phone, address, order_date) VALUES (?, ?, ?, ?, ?)`,
    [fullName, email, phone, address, today],
    (err, orderResult) => {
      if (err) {
        console.error('Error saving order:', err);
        return res.status(500).send("Server error while saving order");
      }
      // Get the ID of the newly inserted order
      const orderId = orderResult.insertId;

      // Create an array of items to insert into 'order_items'
      const orderItems = cart.map(item => [
        orderId,
        item.id,
        item.name,
        item.quantity
      ]);
      // Insert all order items in a single query
      connection.query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity) VALUES ?`,
        [orderItems],
        (err2, result2) => {
          if (err2) {
            console.error("Error saving order items:", err2);
            return res.status(500).send("Server error while saving order items");
          }

          console.log("Order and items saved");
          res.send("Order received and items saved");
        }
      );
    }
  );
});
// Export the router so it can be used in server.js
export default router;
