// Wait for the page to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Find the checkout form on the page
  const form = document.querySelector(".checkout-form");

  if (form) {
    // Add a listener for the form's submit event
    form.addEventListener("submit", function(e) {
      e.preventDefault(); // Stop default form submission

      // Extract user input values from the form
      const name = form.querySelector('input[placeholder="Full Name"]').value.trim();
      const address = form.querySelector('input[placeholder="Address"]').value.trim();
      const email = form.querySelector('input[placeholder="Email"]').value.trim();
      const phone = form.querySelector('input[placeholder="Phone"]').value.trim();

      // Define regular expressions for basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^0\d{9}$/;

      // Check if any required field is empty
      if (!name || !address || !email || !phone) {
        showToast("Please fill in all required fields.");
        return;
      }
      // Validate email format
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.");
        return;
      }
      // Validate Israeli phone number format (must start with 0 and have 10 digits)
      if (!phoneRegex.test(phone)) {
        showToast("Please enter a valid Israeli phone number.");
        return;
      }
      // Load the cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        //  Check if cart is empty
        if (cart.length === 0) {
          showToast("Your cart is empty. Please add items before placing an order.");
          return;
        }
        // Send the order details and cart to the server
        fetch("/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"  /// JSON format instead of form-urlencoded
          },
          body: JSON.stringify({
            fullName: name,
            address,
            email,
            phone,
            cart //// Send the cart items as part of the request
          })
        })

      .then(response => response.text())
      .then(data => {
        // On success - show toast, clear form and cart
        showToast("Your order has been placed! We’ll be in touch soon 💧");

        form.reset(); // Clear form fields
        localStorage.removeItem("cart"); // Clear cart from storage
        updateCartCount(); // Reset cart icon count

        // Clear cart UI display if exists
        const cartContainer = document.querySelector(".cart-items");
        const total = document.querySelector("#cart-total");
        if (cartContainer) cartContainer.innerHTML = "";
        if (total) total.innerText = "Total: ₪0";
      })
      .catch(err => {
        // Handle network or server error
        console.error("Error submitting order:", err);
        showToast("There was an error placing your order. Please try again.");
      });
    });
  }
});