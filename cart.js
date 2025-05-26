/* // localStorage.removeItem("cart"); // TEMP: clears cart on page load ******************/ 


// ==============================
// Load the cart from localStorage
// ==============================
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ==============================
// Save the cart to localStorage
// ==============================
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// Show a toast message (success)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("visible"), 100);

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==============================
// Update the cart badge icon
function updateCartCount() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".cart-count");

  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

// ==============================
// Add item to cart
function addToCart(name, price) {
  const cart = loadCart();
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${name} added to cart`);
}

// ==============================
// Remove item from cart
function removeFromCart(name) {
  let cart = loadCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
  renderCart?.();
  updateCartCount();
}

// ==============================
// Render cart items on shoppingCart.html
function renderCart() {
  const cart = loadCart();
  const container = document.querySelector(".cart-items");
  const totalElement = document.querySelector("#cart-total");
  const emptyMessage = document.querySelector("#empty-cart-message");

  if (!container) return;

  // If cart is empty
  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = "block";
    container.innerHTML = "";
    if (totalElement) totalElement.innerText = "Total: ₪0";
    return;
  } else {
    if (emptyMessage) emptyMessage.style.display = "none";
  }

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

// ==============================
// On page load – hook buttons and update UI
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart?.(); // Only on shoppingCart.html

  // Catalog products
  const productCards = document.querySelectorAll(".product-card");
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

  // Single bottle product
  const singleProductButton = document.querySelector("button.add-to-cart");
  if (singleProductButton && document.querySelector(".product-title")) {
    const name = document.querySelector(".product-title").innerText;
    const priceSpan = document.querySelector(".price");
    const price = parseFloat(priceSpan?.innerText?.replace("₪", "").trim());

    if (name && !isNaN(price)) {
      singleProductButton.addEventListener("click", () => {
        addToCart(name, price);
      });
    }
  }
});



