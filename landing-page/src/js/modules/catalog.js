import productsData from '/data/products.json';

const MOBILE_BREAKPOINT = 768;
const PRODUCTS_PREVIEW_COUNT = 4;

export const initCatalog = () => {
    const container = document.getElementById('products-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const tabButtons = document.querySelectorAll('.tab-item');

    const modal = document.getElementById('product-details');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalTotalPrice = document.getElementById('modal-total-price');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalForm = document.getElementById('modal-form');

    const modalSizesContainer = document.getElementById('modal-sizes-container');
    const modalAdditivesContainer = document.getElementById('modal-additives-container');

    if (!container || !tabButtons.length) return;

    let currentCategory = 'coffee';
    let isExpanded = false;
    let activeProduct = null;

    const createCardHTML = (item) => `
    <article class="product-card" data-id="${item.id}" tabindex="0">
      <figure class="product-card__image-wrapper">
        <img src="${item.image}" alt="${item.name}" class="product-card__image" loading="lazy">
      </figure>
      <div class="product-card__content">
        <h3 class="product-card__title">${item.name}</h3>
        <p class="product-card__description">${item.description}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${parseFloat(item.price).toFixed(2)}</span>
        </div>
      </div>
    </article>
  `;

    const renderCatalog = () => {
        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        const filteredProducts = productsData.filter(item => item.category === currentCategory);
        let visibleProducts = filteredProducts;

        if (isMobile && !isExpanded) {
            visibleProducts = filteredProducts.slice(0, PRODUCTS_PREVIEW_COUNT);
        }

        container.innerHTML = visibleProducts.map(createCardHTML).join('');

        if (loadMoreBtn) {
            loadMoreBtn.style.display = (isMobile && !isExpanded && filteredProducts.length > 4) ? 'inline-flex' : 'none';
        }
    };

    const updateModalPrice = () => {
        if (!activeProduct) return;

        let basePrice = parseFloat(activeProduct.price);
        const selectedInputs = modalForm.querySelectorAll('input:checked');

        selectedInputs.forEach(input => {
            basePrice += parseFloat(input.dataset.addPrice || 0);
        });

        modalTotalPrice.textContent = `$${basePrice.toFixed(2)}`;
    };

    const renderModalOptions = (product) => {
        if (product.sizes) {
            modalSizesContainer.innerHTML = Object.entries(product.sizes)
                .map(([key, sizeData], index) => {
                    const isChecked = index === 0 ? 'checked' : '';
                    const badgeText = key.toUpperCase();

                    return `
            <label class="modal__option">
              <input type="radio" name="size" value="${key}" data-add-price="${sizeData['add-price']}" ${isChecked} hidden>
              <span class="modal__option-btn">
                <span class="modal__option-badge">${badgeText}</span> ${sizeData.size}
              </span>
            </label>
          `;
                }).join('');
        } else {
            modalSizesContainer.innerHTML = '';
        }

        if (product.additives && Array.isArray(product.additives)) {
            modalAdditivesContainer.innerHTML = product.additives
                .map((additive, index) => {
                    const badgeText = index + 1;

                    return `
            <label class="modal__option">
              <input type="checkbox" name="additives" value="${index + 1}" data-add-price="${additive['add-price']}" hidden>
              <span class="modal__option-btn">
                <span class="modal__option-badge">${badgeText}</span> ${additive.name}
              </span>
            </label>
          `;
                }).join('');
        } else {
            modalAdditivesContainer.innerHTML = '';
        }
    };

    const openModal = (productId) => {
        activeProduct = productsData.find(item => String(item.id) === String(productId));
        if (!activeProduct) return;

        modalImg.src = activeProduct.image;
        modalImg.alt = activeProduct.name;
        modalTitle.textContent = activeProduct.name;
        modalDesc.textContent = activeProduct.description;

        renderModalOptions(activeProduct);

        updateModalPrice();

        modal.showModal();
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.close();
        document.body.style.overflow = '';
        activeProduct = null;
    };

    modalForm.addEventListener('change', updateModalPrice);

    container.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card && card.dataset.id) {
            openModal(card.dataset.id);
        }
    });

    container.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('.product-card');
            if (card && card.dataset.id) {
                e.preventDefault();
                openModal(card.dataset.id);
            }
        }
    });

    modal.addEventListener('click', (e) => {
        const dialogBounds = modal.getBoundingClientRect();
        const isClickInside = (
            e.clientX >= dialogBounds.left &&
            e.clientX <= dialogBounds.right &&
            e.clientY >= dialogBounds.top &&
            e.clientY <= dialogBounds.bottom
        );
        if (!isClickInside) {
            closeModal();
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('cancel', () => {
        document.body.style.overflow = '';
        activeProduct = null;
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (!category || category === currentCategory) return;

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
            renderCatalog();
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            isExpanded = true;
            renderCatalog();
        });
    }

    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            renderCatalog();
        }
    });

    renderCatalog();
};