// Wait until the HTML content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get the search input field inside the .search-filter section
  const searchInput = document.querySelector(".search-filter input[type='text']"); 
    // Get the category dropdown (select element)
  const categorySelect = document.querySelector(".search-filter select");
    // Get all product cards on the page
  const productCards = document.querySelectorAll(".product-card");

    // Helper function to clean up text: make lowercase and remove extra spaces
  function normalize(text) {
    return text.toLowerCase().trim();
  }
  // Main function that filters products based on search and category
  function filterProducts() {
    const searchTerm = normalize(searchInput.value);          // What the user typed
    const selectedCategory = normalize(categorySelect.value); // Selected category from dropdown
    
    // Go through each product card and check if it matches the search and category
    productCards.forEach(card => {
      const title = normalize(card.querySelector("h3").innerText);      // Product title
      const description = normalize(card.querySelector("p").innerText); // Product description
      const category = normalize(card.dataset.category || "");          // Product category from data attribute

        // Check if the search term is in the title or description
      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

        // Check if the category matches, or "all categories" is selected
      const matchesCategory = selectedCategory === "all categories" || selectedCategory === category;

      // If both match, show the product. If not, hide it
      if (matchesSearch && matchesCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  // When the user types in the search input, run the filter (listen to 'filterProducts')
  searchInput.addEventListener("input", filterProducts); 

  // When the user selects a different category, run the filter (listen to 'categorySelect')
  categorySelect.addEventListener("change", filterProducts);
});