// This is a list of all products with their details
const products = [
    {
      id: "1",
      name: "Sport Bottle",
      description: "Lightweight drinking bottle",
      price: 45,
      image: "images/1 sport bottle.png",
    },
    {
      id: "2",
      name: "Thermal Bottle",
      description: "Keeps drinks hot or cold",
      price: 60,
      image: "images/2 thermal bottle.png",
    },
    {
      id: "3",
      name: "Eco Bottle",
      description: "Made from recycled plastic",
      price: 40,
      image: "images/3 eco bottle.png",
    },
    {
      id: "4",
      name: "Kids Fun Bottle",
      description: "Fun and colorful for kids",
      price: 35,
      image: "images/4 kids fun bottle.png",
    },
    {
      id: "5",
      name: "Glass Bottle",
      description: "Eco-friendly glass bottle",
      price: 50,
      image: "images/5 glass bottle.png",
    },
    {
      id: "6",
      name: "Compact Bottle",
      description: "Fits in any bag",
      price: 30,
      image: "images/6 compact bottle.png",
    },
  ];
  
  // When the page finishes loading
  document.addEventListener("DOMContentLoaded", () => {
    // Get the ID of the product from the URL (example: product.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
  
    // Find the product in the array using the ID
    const product = products.find(p => p.id === productId);
  
    // If product not found – show error
    if (!product) {
      document.body.innerHTML = "<p style='padding:2rem;'>Product not found.</p>";
      return;
    }
  
    // Set the product info into the HTML
    document.querySelector(".product-image").src = product.image;
    document.querySelector(".product-title").innerText = product.name;
    document.querySelector(".product-desc").innerText = product.description;
    document.querySelector(".product-price").innerText = product.price;
  
    // Add to Cart button
    document.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(product.name, product.price); // from cart.js
    });
  });
  