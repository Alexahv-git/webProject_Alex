
  // Wait for the page to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {

      // Find the checkout form on the page
      const form = document.querySelector(".checkout-form");
    
      // If the form exists, set up a "submit" event listener
      if (form) {
        form.addEventListener("submit", function(e) {
          e.preventDefault(); // Stop the form from actually submitting and refreshing the page
    
          // Get the values from the form inputs
          const name = form.querySelector('input[placeholder="Full Name"]').value.trim();
          const address = form.querySelector('input[placeholder="Address"]').value.trim();
          const email = form.querySelector('input[placeholder="Email"]').value.trim();
          const phone = form.querySelector('input[placeholder="Phone"]').value.trim();
    
          // Regular expressions to validate email and Israeli phone numbers
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^0\d{9}$/; // Israeli number: must start with 0 and have 10 digits
    
          // Check if any fields are empty
          if (!name || !address || !email || !phone) {
            showToast("Please fill in all required fields.");
            return;
          }
    
          // Check if email is invalid
          if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address.");
            return;
          }
    
          // Check if phone number is invalid
          if (!phoneRegex.test(phone)) {
            showToast("Please enter a valid Israeli phone number (10 digits starting with 0).");
            return;
          }
    
          // ✅ If everything is valid – show success message
          showToast("Your order has been placed! We’ll be in touch soon 💧");
    
          // Clear the shopping cart (locally)
          localStorage.removeItem("cart");
          updateCartCount();   // Update cart icon count to 0
          form.reset();        // Clear all input fields in the form
    
          // Also clear the cart display on the page
          const cartContainer = document.querySelector(".cart-items");
          const total = document.querySelector("#cart-total");
          if (cartContainer) cartContainer.innerHTML = "";
          if (total) total.innerText = "Total: ₪0";
        });
      }
    
    });
    