
// Load the current cart from localStorage, If there's no cart yet, returns an empty array
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ==============================================
// Save the updated cart back to localStorage, need the cart to "remember" items between page refreshes
// ==============================================
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// Show a temporary toast message
// ==============================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  // Make the toast appear after a short delay
  setTimeout(() => toast.classList.add("visible"), 100);
  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==============================
// Update the cart icon badge (top right) to show how many total items are in the cart
// ==============================
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
// Add item to cart (if exists, increment quantity)
// ==============================
function addToCart(id, name, price) {
  const cart = loadCart();
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++; // Increase quantity
  } else {
    cart.push({ id, name, price, quantity: 1 }); //
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${name} added to cart`);
}


// ==============================
// Remove item from cart
// ==============================
function removeFromCart(name) {
  let cart = loadCart(); // Get current cart
  cart = cart.filter(item => item.name !== name); // Keep only items that don't match the name
  saveCart(cart);// Save updated cart
  renderCart?.();/// Refresh cart display (if this function exists on page)
  updateCartCount();// Update icon
}

// ==============================
// Display the cart contents on the shopping cart html page
// ==============================
function renderCart() {
  const cart = loadCart();
  const container = document.querySelector(".cart-items"); // Where to show the items
  const totalElement = document.querySelector("#cart-total");// Where to show the total price
  const emptyMessage = document.querySelector("#empty-cart-message"); // Message to show when cart is empty

  if (!container) return; // Stop if there's no container

  // If cart is empty – show message and clear total
  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = "block"; // Show "empty cart" message
    container.innerHTML = "";
    if (totalElement) totalElement.innerText = "Total: ₪0"; // Set total to 0
    return;
  } else {
    if (emptyMessage) emptyMessage.style.display = "none"; // Hide "empty" message
  }
  // Render all items in the cart
  container.innerHTML = ""; // Clear current list
  let total = 0; // Initialize total cost
  // Loop through items in the cart
  cart.forEach(item => {
    const div = document.createElement("div"); // Create a new div for each item
    div.className = "cart-item"; // Give it a class
    div.innerHTML = `
      <p>${item.name} x${item.quantity} - ₪${item.price * item.quantity}</p>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    container.appendChild(div); // Add the item to the container
    total += item.price * item.quantity; // Add to total
  });

  if (totalElement) totalElement.innerText = `Total: ₪${total}`; // Update total price on page
}

// ==============================================
// When the page loads: initialize buttons and cart display
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(); // Show correct number on cart icon
  renderCart?.(); // Show cart items, only if function is defined

  // Add-to-cart buttons on catalog products
const productCards = document.querySelectorAll(".product-card"); 
productCards.forEach(card => {
  const id = parseInt(card.dataset.id); // 
  const name = card.querySelector("h3 a")?.innerText;
  const price = parseFloat(card.querySelector(".price")?.innerText.replace("₪", ""));
  const button = card.querySelector(".add-to-cart");

  if (button && id && name && !isNaN(price)) {
    button.addEventListener("click", () => {
      addToCart(id, name, price); // 
    });
  }
});


  // Add-to-cart button on single product page
  const singleProductButton = document.querySelector("button.add-to-cart");
  if (singleProductButton && document.querySelector(".product-title")) {
    const name = document.querySelector(".product-title").innerText; // Get product name
    const priceSpan = document.querySelector(".price"); // Price
    const price = parseFloat(priceSpan?.innerText?.replace("₪", "").trim());
    const id = parseInt(new URLSearchParams(window.location.search).get("id"));


      if (id && name && !isNaN(price)) {
       singleProductButton.addEventListener("click", () => {
        addToCart(id, name, price);
        });
      }

  }
});



