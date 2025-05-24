// ==============================
// Toast Notification (Success)
// ==============================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("visible");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==============================
// Update Cart Icon Badge
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
// Hook to AddToCart
// ==============================
function addToCart(name, price) {
  let cart = loadCart();
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
// Run on Load
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});