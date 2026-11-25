
document.addEventListener("DOMContentLoaded", function () {

    const poetryCards = document.querySelectorAll(".poetry-card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const emptyMessage = document.getElementById("emptyMessage");

    let selectedCategory = "All";

    // Current year
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    // Filter and search poetry
    function showPoetry() {

        const searchText = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        poetryCards.forEach(function (card) {

            const category = card.dataset.category;
            const content = card.textContent.toLowerCase();

            const categoryMatch =
                selectedCategory === "All" ||
                category === selectedCategory;

            const searchMatch = content.includes(searchText);

            if (categoryMatch && searchMatch) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        emptyMessage.hidden = visibleCount !== 0;
    }

    // Category buttons
    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedCategory = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            showPoetry();
        });
    });

    // Search button
    searchButton.addEventListener("click", showPoetry);

    // Search while typing
    searchInput.addEventListener("input", showPoetry);

    // Category cards
    document.querySelectorAll(".category-card").forEach(function (card) {

        card.addEventListener("click", function () {

            selectedCategory = card.dataset.category;

            filterButtons.forEach(function (btn) {
                btn.classList.toggle(
                    "active",
                    btn.dataset.filter === selectedCategory
                );
            });

            showPoetry();
        });
    });

});
