import { connection } from './connection.js';

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL');

  // Drop existing tables (in correct order)
  connection.query(`DROP TABLE IF EXISTS order_items`, err => {
    if (err) throw err;

    connection.query(`DROP TABLE IF EXISTS orders`, err => {
      if (err) throw err;

      connection.query(`DROP TABLE IF EXISTS products`, err => {
        if (err) throw err;

        // Create products table
        connection.query(`
          CREATE TABLE products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            description TEXT,
            image_path VARCHAR(255),
            category VARCHAR(50)
          )
        `, err => {
          if (err) throw err;

          // Insert updated products
          const insertProducts = `
            INSERT INTO products (name, price, description, image_path, category) VALUES ?
          `;

          const productData = [
            ['Sport Bottle', 45.00, 'Lightweight drinking bottle', '/images/1 sport bottle.png', 'sport'],
            ['Thermal Bottle', 60.00, 'Keeps drinks hot or cold', '/images/2 thermal bottle.png', 'thermal'],
            ['Eco Bottle', 40.00, 'Made from recycled plastic', '/images/3 eco bottle.png', 'eco'],
            ['Kids Fun Bottle', 35.00, 'Fun and colorful for kids', '/images/4 kids fun bottle.png', 'kids'],
            ['Glass Bottle', 50.00, 'Eco-friendly glass bottle', '/images/5 glass bottle.png', 'eco'],
            ['Compact Bottle', 30.00, 'Fits in any bag', '/images/6 compact bottle.png', 'compact'],
          ];

          connection.query(insertProducts, [productData], err => {
            if (err) throw err;

            console.log("Products table created and filled.");

            // Create orders table
            connection.query(`
              CREATE TABLE orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_name VARCHAR(100),
                email VARCHAR(100),
                phone VARCHAR(20),
                address VARCHAR(200),
                order_date DATE
              )

            `, err => {
              if (err) throw err;

              console.log("Orders table created.");

              // Create order_items table
              connection.query(`
              CREATE TABLE order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT,
                product_id INT,
                product_name VARCHAR(100),
                quantity INT,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
              )

              `, err => {
                if (err) throw err;

                console.log("Order_items table created.");
                connection.end(); // Close connection
              });
            });
          });
        });
      });
    });
  });
});
