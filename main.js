const productList = document.getElementById("productList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const itemsPerPageSelect = document.getElementById("itemsPerPage");
const paginationContainer = document.getElementById("pagination");

let currentPage = 1;
let itemsPerPage = 20;
let debounceTimer = null;

// Cache para evitar re-ordenações desnecessárias
let cachedSort = { value: "", list: null, result: null };

function renderProducts(list) {
    const fragment = document.createDocumentFragment();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = list.slice(start, end);

    pageItems.forEach(product => {
        const card = document.createElement("div");
        card.className = "product";

        const link = document.createElement("a");
        link.href = product.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `R$ ${product.price.toFixed(2)}`;

        link.append(img, title, price);
        card.appendChild(link);
        fragment.appendChild(card);
    });

    productList.innerHTML = "";
    productList.appendChild(fragment);
    renderPagination(list.length);
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
    }

    const fragment = document.createDocumentFragment();

    // Limita a exibição de botões para melhor UX
    const maxButtons = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Botão anterior
    if (currentPage > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "←";
        prevBtn.addEventListener("click", () => {
            currentPage--;
            filterAndRender();
        });
        fragment.appendChild(prevBtn);
    }

    // Primeira página + ellipsis
    if (startPage > 1) {
        const firstBtn = document.createElement("button");
        firstBtn.textContent = "1";
        firstBtn.addEventListener("click", () => {
            currentPage = 1;
            filterAndRender();
        });
        fragment.appendChild(firstBtn);

        if (startPage > 2) {
            const ellipsis = document.createElement("span");
            ellipsis.textContent = "...";
            ellipsis.style.padding = "0 0.5rem";
            fragment.appendChild(ellipsis);
        }
    }

    // Páginas do meio
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", () => {
            currentPage = i;
            filterAndRender();
        });
        fragment.appendChild(btn);
    }

    // Última página + ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.textContent = "...";
            ellipsis.style.padding = "0 0.5rem";
            fragment.appendChild(ellipsis);
        }

        const lastBtn = document.createElement("button");
        lastBtn.textContent = totalPages;
        lastBtn.addEventListener("click", () => {
            currentPage = totalPages;
            filterAndRender();
        });
        fragment.appendChild(lastBtn);
    }

    // Botão próximo
    if (currentPage < totalPages) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "→";
        nextBtn.addEventListener("click", () => {
            currentPage++;
            filterAndRender();
        });
        fragment.appendChild(nextBtn);
    }

    paginationContainer.innerHTML = "";
    paginationContainer.appendChild(fragment);
}

function sortProducts(value, list) {
    // Usa cache se a ordenação for a mesma
    if (cachedSort.value === value && cachedSort.list === list) {
        return cachedSort.result;
    }

    let result;
    switch (value) {
        case "newest":
            result = [...list];
            break;
        case "oldest":
            result = [...list].reverse();
            break;
        case "cheapest":
            result = [...list].sort((a, b) => a.price - b.price);
            break;
        case "expensive":
            result = [...list].sort((a, b) => b.price - a.price);
            break;
        default:
            result = list;
    }

    cachedSort = { value, list, result };
    return result;
}

function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortValue = sortSelect.value;

    const filtered = searchTerm
        ? products.filter(product => product.name.toLowerCase().includes(searchTerm))
        : products;

    const sorted = sortProducts(sortValue, filtered);
    renderProducts(sorted);
}

// Debounce para busca - evita muitas renderizações
function debounce(fn, delay) {
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fn.apply(this, args), delay);
    };
}

searchInput.addEventListener("input", debounce(() => {
    currentPage = 1;
    cachedSort.list = null; // Invalida cache ao buscar
    filterAndRender();
}, 300));

sortSelect.addEventListener("change", () => {
    currentPage = 1;
    filterAndRender();
});

itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value, 10);
    currentPage = 1;
    filterAndRender();
});

// Inicialização
sortSelect.value = "newest";
itemsPerPageSelect.value = "20";
filterAndRender();
