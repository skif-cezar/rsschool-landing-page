import productsData from '/data/products.json';

export const initCatalog = () => {
  const container = document.getElementById('products-container');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const tabButtons = document.querySelectorAll('.tab-item');

  if (!container || !tabButtons.length) return;

  let currentCategory = 'coffee';
  let isExpanded = false;

  const createCardHTML = (item) => `
    <article class="product-card" data-id="${item.id}">
      <figure class="product-card__image-wrapper">
        <img src="${item.image}" alt="${item.name}" class="product-card__image" loading="lazy">
      </figure>
      <div class="product-card__content">
        <h3 class="product-card__title">${item.name}</h3>
        <p class="product-card__description">${item.description}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${item.price}</span>
        </div>
      </div>
    </article>
  `;

  const render = () => {
    const isMobile = window.innerWidth <= 768;
    const filteredProducts = productsData.filter(item => item.category === currentCategory);

    let visibleProducts = filteredProducts;

    if (isMobile && !isExpanded) {
      visibleProducts = filteredProducts.slice(0, 4);
    }

    container.innerHTML = visibleProducts.map(createCardHTML).join('');

    if (isMobile && !isExpanded && filteredProducts.length > 4) {
      loadMoreBtn.style.display = 'inline-flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      if (category === currentCategory) return;

      tabButtons.forEach(b => {
        b.classList.remove('tab-item--active');
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });

      btn.classList.add('tab-item--active');
      btn.setAttribute('aria-selected', 'true');
      btn.removeAttribute('tabindex');

      currentCategory = category;
      isExpanded = false;
      render();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      isExpanded = true;
      render();
    });
  }

  window.addEventListener('resize', () => {
    render();
  });

  render();
}