/**
 * TikShop Loja - Main Application
 * Gerencia a exibição, busca, ordenação e paginação de produtos
 */

// ============================================
// CONSTANTS
// ============================================

const ITEMS_PER_PAGE_DEFAULT = 20;
const DEBOUNCE_DELAY = 300;
const MAX_PAGINATION_BUTTONS = 7;
const SCROLL_THRESHOLD = 300;

const SortOptions = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  CHEAPEST: 'cheapest',
  EXPENSIVE: 'expensive'
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
  productList: document.getElementById('productList'),
  searchInput: document.getElementById('search'),
  sortSelect: document.getElementById('sort'),
  itemsPerPageSelect: document.getElementById('itemsPerPage'),
  paginationContainer: document.getElementById('pagination')
};

// ============================================
// STATE
// ============================================

const state = {
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE_DEFAULT,
  debounceTimer: null,
  sortCache: { value: '', list: null, result: null }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Cria um elemento DOM com atributos e filhos
 */
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else if (key.startsWith('on')) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  });

  return element;
}

/**
 * Formata valor para moeda brasileira
 */
function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

/**
 * Cria função com debounce
 */
function debounce(fn, delay) {
  return function(...args) {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ============================================
// PRODUCT RENDERING
// ============================================

/**
 * Cria card de produto
 */
function createProductCard(product) {
  const card = createElement('div', { className: 'product' });

  const link = createElement('a', {
    href: product.link,
    target: '_blank',
    rel: 'noopener noreferrer'
  });

  const img = createElement('img', {
    src: product.image,
    alt: product.name,
    loading: 'lazy'
  });

  const info = createElement('div', { className: 'product-info' });
  const title = createElement('h3', { textContent: product.name });
  const price = createElement('p', { textContent: formatCurrency(product.price) });

  info.append(title, price);

  const buyBtn = createElement('span', {
    className: 'btn-buy',
    textContent: 'Ver Oferta'
  });

  link.append(img, info);
  card.append(link, buyBtn);

  return card;
}

/**
 * Cria estado vazio (nenhum produto encontrado)
 */
function createEmptyState() {
  const container = createElement('div', { className: 'empty-state' });

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.innerHTML = `
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
    <path d="M8 11h6"/>
  `;

  const text = createElement('p', {
    textContent: 'Nenhum produto encontrado. Tente outra busca.'
  });

  container.append(icon, text);
  return container;
}

/**
 * Renderiza lista de produtos
 */
function renderProducts(list) {
  const fragment = document.createDocumentFragment();
  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  const pageItems = list.slice(start, end);

  if (pageItems.length === 0) {
    fragment.appendChild(createEmptyState());
  } else {
    pageItems.forEach(product => {
      fragment.appendChild(createProductCard(product));
    });
  }

  elements.productList.innerHTML = '';
  elements.productList.appendChild(fragment);

  renderPagination(list.length);
}

// ============================================
// PAGINATION
// ============================================

/**
 * Cria botão de paginação
 */
function createPaginationButton(text, onClick, isActive = false) {
  return createElement('button', {
    textContent: text,
    className: isActive ? 'active' : '',
    onClick
  });
}

/**
 * Cria ellipsis para paginação
 */
function createEllipsis() {
  return createElement('span', { textContent: '...' });
}

/**
 * Calcula range de páginas a exibir
 */
function calculatePageRange(currentPage, totalPages) {
  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGINATION_BUTTONS / 2));
  let endPage = Math.min(totalPages, startPage + MAX_PAGINATION_BUTTONS - 1);

  if (endPage - startPage < MAX_PAGINATION_BUTTONS - 1) {
    startPage = Math.max(1, endPage - MAX_PAGINATION_BUTTONS + 1);
  }

  return { startPage, endPage };
}

/**
 * Renderiza controles de paginação
 */
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / state.itemsPerPage);

  if (totalPages <= 1) {
    elements.paginationContainer.innerHTML = '';
    return;
  }

  const fragment = document.createDocumentFragment();
  const { startPage, endPage } = calculatePageRange(state.currentPage, totalPages);

  // Botão anterior
  if (state.currentPage > 1) {
    fragment.appendChild(
      createPaginationButton('←', () => {
        state.currentPage--;
        filterAndRender();
        scrollToTop();
      })
    );
  }

  // Primeira página + ellipsis
  if (startPage > 1) {
    fragment.appendChild(
      createPaginationButton('1', () => {
        state.currentPage = 1;
        filterAndRender();
        scrollToTop();
      })
    );

    if (startPage > 2) {
      fragment.appendChild(createEllipsis());
    }
  }

  // Páginas do meio
  for (let i = startPage; i <= endPage; i++) {
    const pageNum = i;
    fragment.appendChild(
      createPaginationButton(
        i.toString(),
        () => {
          state.currentPage = pageNum;
          filterAndRender();
          scrollToTop();
        },
        i === state.currentPage
      )
    );
  }

  // Última página + ellipsis
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      fragment.appendChild(createEllipsis());
    }

    fragment.appendChild(
      createPaginationButton(totalPages.toString(), () => {
        state.currentPage = totalPages;
        filterAndRender();
        scrollToTop();
      })
    );
  }

  // Botão próximo
  if (state.currentPage < totalPages) {
    fragment.appendChild(
      createPaginationButton('→', () => {
        state.currentPage++;
        filterAndRender();
        scrollToTop();
      })
    );
  }

  elements.paginationContainer.innerHTML = '';
  elements.paginationContainer.appendChild(fragment);
}

// ============================================
// SORTING & FILTERING
// ============================================

/**
 * Ordena lista de produtos
 */
function sortProducts(sortValue, list) {
  // Usa cache se a ordenação for a mesma
  if (state.sortCache.value === sortValue && state.sortCache.list === list) {
    return state.sortCache.result;
  }

  let result;

  switch (sortValue) {
    case SortOptions.NEWEST:
      result = [...list];
      break;
    case SortOptions.OLDEST:
      result = [...list].reverse();
      break;
    case SortOptions.CHEAPEST:
      result = [...list].sort((a, b) => a.price - b.price);
      break;
    case SortOptions.EXPENSIVE:
      result = [...list].sort((a, b) => b.price - a.price);
      break;
    default:
      result = list;
  }

  state.sortCache = { value: sortValue, list, result };
  return result;
}

/**
 * Filtra produtos por termo de busca
 */
function filterProducts(searchTerm) {
  if (!searchTerm) return products;

  const term = searchTerm.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(term)
  );
}

/**
 * Filtra e renderiza produtos
 */
function filterAndRender() {
  const searchTerm = elements.searchInput.value.trim();
  const sortValue = elements.sortSelect.value;

  const filtered = filterProducts(searchTerm);
  const sorted = sortProducts(sortValue, filtered);

  renderProducts(sorted);
}

// ============================================
// SCROLL TO TOP
// ============================================

/**
 * Cria botão de scroll to top
 */
function createScrollToTopButton() {
  const button = createElement('button', {
    className: 'scroll-to-top',
    textContent: '↑',
    'aria-label': 'Voltar ao topo',
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
  });

  document.body.appendChild(button);
  return button;
}

/**
 * Scroll suave para o topo
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Gerencia visibilidade do botão scroll to top
 */
function handleScrollToTopVisibility(button) {
  const isVisible = window.scrollY > SCROLL_THRESHOLD;
  button.classList.toggle('visible', isVisible);
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handler para busca
 */
const handleSearch = debounce(() => {
  state.currentPage = 1;
  state.sortCache.list = null;
  filterAndRender();
}, DEBOUNCE_DELAY);

/**
 * Handler para mudança de ordenação
 */
function handleSortChange() {
  state.currentPage = 1;
  filterAndRender();
}

/**
 * Handler para mudança de itens por página
 */
function handleItemsPerPageChange() {
  state.itemsPerPage = parseInt(elements.itemsPerPageSelect.value, 10);
  state.currentPage = 1;
  filterAndRender();
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Inicializa event listeners
 */
function initEventListeners() {
  elements.searchInput.addEventListener('input', handleSearch);
  elements.sortSelect.addEventListener('change', handleSortChange);
  elements.itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);

  // Scroll to top button
  const scrollBtn = createScrollToTopButton();
  window.addEventListener('scroll', () => handleScrollToTopVisibility(scrollBtn), { passive: true });
}

/**
 * Inicializa valores padrão
 */
function initDefaults() {
  elements.sortSelect.value = SortOptions.NEWEST;
  elements.itemsPerPageSelect.value = ITEMS_PER_PAGE_DEFAULT.toString();
}

/**
 * Inicializa a aplicação
 */
function init() {
  initDefaults();
  initEventListeners();
  filterAndRender();
}

// Inicia a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
