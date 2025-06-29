
import { connection } from './connection.js'


connection.query('CREATE DATABASE IF NOT EXISTS drinkwater', (err) => {
  if (err) throw err;
  console.log('Database created or already exists.');


  connection.changeUser({ database: 'drinkwater' }, (err) => {
    if (err) throw err;

   
    const createProducts = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        price DECIMAL(10,2),
        description TEXT,
        image_path VARCHAR(255),
        catagory VARCHAR(100)
      )
    `;


     const createOrders = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100),
        order_date DATE
      )
    `;

    const createOrderItems = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        quantity INT,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `;

    connection.query(createProducts, (err) => {
      if (err) throw err;
      console.log('Table "products" created');
    });

    connection.query(createOrders, (err) => {
      if (err) throw err;
      console.log('Table "orders" created');
    });

    connection.query(createOrderItems, (err) => {
      if (err) throw err;
      console.log('Table "order_items" created');
      connection.end();
    });
  });
});
