const productList = document.getElementById("productList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

function renderProducts(list) {
    productList.innerHTML = "";
    list.forEach(product => {
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
}

function sortProducts(value, list) {
    if (value === "newest") return [...list];
    if (value === "oldest") return [...list].reverse();
    if (value === "cheapest") return [...list].sort((a, b) => a.price - b.price);
    if (value === "expensive") return [...list].sort((a, b) => b.price - a.price);
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

searchInput.addEventListener("input", filterAndRender);
sortSelect.addEventListener("change", filterAndRender);

sortSelect.value = "newest";
filterAndRender();
