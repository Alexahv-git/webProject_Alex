document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-filter input[type='text']");
  const categorySelect = document.querySelector(".search-filter select");
  const productCards = document.querySelectorAll(".product-card");

  function normalize(text) {
    return text.toLowerCase().trim();
  }

  function filterProducts() {
    const searchTerm = normalize(searchInput.value);
    const selectedCategory = normalize(categorySelect.value);

    productCards.forEach(card => {
      const title = normalize(card.querySelector("h3").innerText);
      const description = normalize(card.querySelector("p").innerText);
      const category = normalize(card.dataset.category || "");

      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
      const matchesCategory = selectedCategory === "all categories" || selectedCategory === category;

      if (matchesSearch && matchesCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterProducts);
  categorySelect.addEventListener("change", filterProducts);
});