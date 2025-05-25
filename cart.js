
// localStorage.removeItem("cart"); // TEMP: clears cart on page load *******************


// Load the cart from localStorage or start with an empty array
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save the cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add an item to the cart
function addToCart(name, price) {
  let cart = loadCart();

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  alert(`${name} added to cart`);
}

// Remove an item from the cart
function removeFromCart(name) {
  let cart = loadCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
  renderCart(); // Only works if renderCart exists on the page
  updateCartCount(); // 
}

// Render the shopping cart content in the shoppingCart.html page
function renderCart() {
  let cart = loadCart();

  const container = document.querySelector(".cart-items");
  const totalElement = document.querySelector("#cart-total");
  if (!container) return; // Avoid errors if cart section not found

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} x${item.quantity} - ₪${item.price * item.quantity}</p>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    container.appendChild(div);
    total += item.price * item.quantity;
  });

  if (totalElement) totalElement.innerText = `Total: ₪${total}`;
}

// After DOM is loaded, attach addToCart functionality to product buttons
document.addEventListener("DOMContentLoaded", () => {
  // Catalog page logic
  const productCards = document.querySelectorAll(".product-card");

  if (productCards.length > 0) {
    productCards.forEach(card => {
      const name = card.querySelector("h3 a")?.innerText;
      const price = parseFloat(card.querySelector(".price")?.innerText.replace("₪", ""));
      const button = card.querySelector(".add-to-cart");

      if (button && name && !isNaN(price)) {
        button.addEventListener("click", () => {
          addToCart(name, price);
        });
      }
    });
  }

  // Single bottle page logic
  const singleProductButton = document.querySelector("button.add-to-cart");
  if (singleProductButton && document.querySelector(".product-title")) {
    const name = document.querySelector(".product-title").innerText;
    const priceText = document.querySelector("p strong")?.nextSibling?.textContent;
    const price = parseFloat(priceText?.replace("₪", "").trim());

    if (name && !isNaN(price)) {
      singleProductButton.addEventListener("click", () => {
        addToCart(name, price);
      });
    }
  }
});