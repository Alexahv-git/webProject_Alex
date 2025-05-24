document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".checkout-form");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = form.querySelector('input[placeholder="Full Name"]').value.trim();
      const address = form.querySelector('input[placeholder="Address"]').value.trim();
      const email = form.querySelector('input[placeholder="Email"]').value.trim();
      const phone = form.querySelector('input[placeholder="Phone"]').value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^0\d{9}$/;

      if (!name || !address || !email || !phone) {
        showToast("Please fill in all required fields.");
        return;
      }

      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showToast("Please enter a valid Israeli phone number (10 digits starting with 0).");
        return;
      }

      // ✅ אם הכול תקין
      showToast("Your order has been placed! We’ll be in touch soon 💧");

      localStorage.removeItem("cart");
      form.reset();

      const cartContainer = document.querySelector(".cart-items");
      const total = document.querySelector("#cart-total");
      if (cartContainer) cartContainer.innerHTML = "";
      if (total) total.innerText = "Total: ₪0";
    });
  }
});
