const productList = document.getElementById("productList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const itemsPerPageSelect = document.getElementById("itemsPerPage");
const paginationContainer = document.getElementById("pagination");

let currentPage = 1;
let itemsPerPage = 20;

function renderProducts(list) {
    productList.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = list.slice(start, end);

    pageItems.forEach(product => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
          <a href="${product.link}" target="_blank">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
          </a>
        `;
        productList.appendChild(card);
    });

    renderPagination(list.length);
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", () => {
            currentPage = i;
            filterAndRender();
        });
        paginationContainer.appendChild(btn);
    }
}

function sortProducts(value, list) {
    if (value === "newest") return [...list];
    if (value === "oldest") return [...list].reverse();
    if (value === "cheapest") return [...list].sort((a, b) => a.price - b.price);
    if (value === "expensive") return [...list].sort((a, b) => b.price - a.price);
    return list;
}

function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    const sorted = sortProducts(sortValue, filtered);
    renderProducts(sorted);
}

searchInput.addEventListener("input", () => {
    currentPage = 1;
    filterAndRender();
});

sortSelect.addEventListener("change", () => {
    currentPage = 1;
    filterAndRender();
});

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1;
    filterAndRender();
});

sortSelect.value = "newest";
itemsPerPageSelect.value = "20";
filterAndRender();
