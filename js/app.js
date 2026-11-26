/**
 * DULCE MILLONARIO - APLICACIÓN PRINCIPAL (JS)
 * Manejo de catálogo en bandejas de plástico, modal de producto, carrito de compras, 
 * calculadora interactiva de porciones y pedidos automáticos por WhatsApp.
 */

// ==========================================================================
// 1. CONFIGURACIÓN DEL NEGOCIO
// ==========================================================================
const CONFIG = {
  businessName: "Dulce Millonario",
  whatsappNumber: "5493757466613",      // Número de WhatsApp configurado (Arg: +54 9 3757 466613)
  phoneDisplay: "+54 9 3757 46-6613",    // Formato visible para clientes
  currencySymbol: "$"
};

// ==========================================================================
// 2. CATÁLOGO DE POSTRES EN BANDEJA DE PLÁSTICO
// ==========================================================================
const PRODUCTS = [
  {
    id: "tiramisu",
    name: "Tiramisú Clásico",
    packaging: "Bandeja plástica con tapa hermética",
    category: "clasicos",
    badge: "⭐ El Más Pedido",
    description: "El auténtico tiramisú tradicional presentado en práctica bandeja de plástico cristal con tapa hermética. Capas de vainillas embebidas en café espresso y un toque de licor, suave crema mascarpone y una generosa lluvia de cacao amargo belga.",
    ingredients: "Café espresso recién preparado, queso mascarpone suave, vainillas artesanales, cacao amargo premium y licor dulce.",
    image: "images/tiramisu-bandeja.jpg",
    packagingImages: {
      rectangular: "images/tiramisu-rectangular.jpg",
      redondo: "images/tiramisu-redondo.jpg"
    },
    sizes: {
      chica: { name: "Bandeja Chica (Plástica)", portions: "4 a 6 porciones", price: 14500 },
      mediana: { name: "Bandeja Mediana (Plástica)", portions: "8 a 10 porciones", price: 23500 },
      grande: { name: "Bandeja Familiar (Plástica)", portions: "15 a 18 porciones", price: 34000 }
    }
  },
  {
    id: "chocotorta",
    name: "Chocotorta Suprema",
    packaging: "Bandeja plástica con tapa hermética",
    category: "chocolatosos",
    badge: "❤️ Clásico Favorito",
    description: "La reina indiscutida de las mesas dulces en bandeja plástica sellada lista para refrigerar. Múltiples capas de galletitas Chocolinas humedecidas en leche chocolatada o café, abundante relleno de dulce de leche repostero colonial con queso crema.",
    ingredients: "Galletitas Chocolinas originales, dulce de leche repostero de primera, queso crema suave y lluvia de chocolate raspado.",
    image: "images/chocotorta-bandeja.jpg",
    packagingImages: {
      rectangular: "images/chocotorta-rectangular.jpg",
      redondo: "images/chocotorta-redondo.jpg"
    },
    sizes: {
      chica: { name: "Bandeja Chica (Plástica)", portions: "4 a 6 porciones", price: 13500 },
      mediana: { name: "Bandeja Mediana (Plástica)", portions: "8 a 10 porciones", price: 21500 },
      grande: { name: "Bandeja Familiar (Plástica)", portions: "15 a 18 porciones", price: 31500 }
    }
  },
  {
    id: "tiramisu-oreo",
    name: "Tiramisú de Oreo",
    packaging: "Bandeja plástica con tapa hermética",
    category: "clasicos",
    badge: "🍪 Novedad Irresistible",
    description: "Una fusión deliciosa y moderna: capas generosas de galletitas Oreo troceadas e hidratadas con suave crema mascarpone a punto nieve y lluvia de cacao amargo, servido en bandeja de plástico con tapa hermética.",
    ingredients: "Galletitas Oreo originales, crema tipo mascarpone a punto nieve, toque sutil de café con vainilla y cacao amargo.",
    image: "images/tiramisu-oreo-bandeja.jpg",
    packagingImages: {
      rectangular: "images/tiramisu-oreo-rectangular.jpg",
      redondo: "images/tiramisu-oreo-redondo.jpg"
    },
    sizes: {
      chica: { name: "Bandeja Chica (Plástica)", portions: "4 a 6 porciones", price: 15000 },
      mediana: { name: "Bandeja Mediana (Plástica)", portions: "8 a 10 porciones", price: 24000 },
      grande: { name: "Bandeja Familiar (Plástica)", portions: "15 a 18 porciones", price: 34500 }
    }
  },
  {
    id: "ensalada-frutas",
    name: "Ensalada de Frutas Natural",
    packaging: "Pote plástico acanalado con tapa hermética",
    category: "frutales",
    badge: "🍊 100% Fresca & Natural",
    description: "Refrescante ensalada de frutas seleccionadas: banana dulce, manzana crujiente y gajos jugosos de naranja en su jugo natural. Servida en pote plástico transparente acanalado con tapa hermética.",
    ingredients: "Bananas maduras en su punto justo, manzanas rojas y verdes frescas, naranjas dulces y jugo 100% natural recién exprimido.",
    image: "images/ensalada-frutas-redondo.jpg",
    packagingImages: {
      rectangular: "images/ensalada-rectangular.jpg",
      redondo: "images/ensalada-frutas-redondo.jpg"
    },
    sizes: {
      chica: { name: "Pote Chico (1 a 2 porciones)", portions: "1 a 2 porciones", price: 6500 },
      mediana: { name: "Pote Mediano (3 a 5 porciones)", portions: "3 a 5 porciones", price: 11500 },
      grande: { name: "Bol Familiar (8 a 10 porciones)", portions: "8 a 10 porciones", price: 17500 }
    }
  }
];

// ==========================================================================
// 3. MODELOS DE ENVASE / BANDEJA DE PLÁSTICO
// ==========================================================================
const PACKAGING_MODELS = {
  rectangular: {
    id: "rectangular",
    name: "Bandeja Rectangular",
    fullName: "Bandeja Rectangular con tapa hermética",
    tag: "Tapa Bisagra",
    shortDesc: "Cierre hermético abovedado. Ideal para Tiramisú y Chocotorta.",
    fullDesc: "Bandeja plástica transparente acanalada reforzada con tapa bisagra domo y cierre hermético. Permite ver las capas del postre y cortar porciones perfectas sin derrames.",
    image: "images/modelo-bandeja-rectangular.jpg",
    badge: "Opción Clásica"
  },
  redondo: {
    id: "redondo",
    name: "Pote Redondo / Bowl",
    fullName: "Pote Redondo / Bowl con tapa hermética",
    tag: "Tapa a Presión",
    shortDesc: "Cierre a presión antiderrame. Ideal para ensalada de fruta o cuchareables.",
    fullDesc: "Pote o bowl circular transparente reforzado con tapa a presión antiderrame. Práctico y seguro para servir directo a la mesa y conservar en heladera.",
    image: "images/modelo-pote-redondo.jpg",
    badge: "Opción Circular"
  }
};

// ==========================================================================
// 4. ESTADO GLOBAL
// ==========================================================================
let cart = JSON.parse(localStorage.getItem("dulce_cart")) || [];
let activeProductModal = null;
let selectedModalPackagingModel = "rectangular";
let selectedModalSizeKey = "mediana";
let modalQuantity = 1;

// ==========================================================================
// 5. INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog("all");
  updateCartUI();
  initCategoryFilters();
  initModalEvents();
  initPackagingLightboxEvents();
  initPackagingPricingModalEvents();
  initCartDrawerEvents();
  initCalculator();
  initAccordion();
  initMobileMenu();
  initAdminCostPanel();
});

function formatCurrency(number) {
  return CONFIG.currencySymbol + number.toLocaleString("es-AR");
}

// ==========================================================================
// 5. RENDERIZADO DEL CATÁLOGO
// ==========================================================================
function renderCatalog(filter = "all") {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  const filtered = filter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  container.innerHTML = filtered.map(prod => {
    return `
      <article class="product-card">
        <div class="product-media">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <span class="product-badge">${prod.badge}</span>
        </div>
        <div class="product-content">
          <span class="product-category">
            <i class="fa-solid fa-box-open"></i> ${prod.packaging}
          </span>
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-desc">${prod.description}</p>

          <!-- Miniaturas de las 2 opciones de envase -->
          <div class="product-packaging-row">
            <span class="product-packaging-label"><i class="fa-solid fa-hand-pointer"></i> Elegí tu envase:</span>
            <div class="product-packaging-thumbs">
              <button class="prod-pack-thumb" onclick="openProductModalWithPackaging('${prod.id}', 'rectangular')" title="Pedir ${prod.name} en Bandeja Rectangular">
                <img src="${prod.packagingImages ? prod.packagingImages.rectangular : 'images/modelo-bandeja-rectangular.jpg'}" alt="${prod.name} en Bandeja Rectangular">
                <span>Rectangular</span>
              </button>
              <button class="prod-pack-thumb" onclick="openProductModalWithPackaging('${prod.id}', 'redondo')" title="Pedir ${prod.name} en Pote Redondo">
                <img src="${prod.packagingImages ? prod.packagingImages.redondo : 'images/modelo-pote-redondo.jpg'}" alt="${prod.name} en Pote Redondo">
                <span>Redondo</span>
              </button>
            </div>
          </div>

          <div class="product-footer">
            <div class="product-price-box">
              <span class="product-price-label">Mediana (8-10 p.):</span>
              <span class="product-price-val">${formatCurrency(prod.sizes.mediana.price)}</span>
            </div>
            <button class="btn btn-primary btn-open-modal" onclick="openProductModal('${prod.id}')">
              <i class="fa-solid fa-plus"></i> Elegir Tamaño
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderCatalog(category);
    });
  });
}

// ==========================================================================
// 6. MODAL DETALLE DE PRODUCTO
// ==========================================================================
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeProductModal = product;
  // Si es ensalada de frutas, sugerir pote redondo por defecto; para los demás, bandeja rectangular
  selectedModalPackagingModel = (product.id === "ensalada-frutas") ? "redondo" : "rectangular";
  selectedModalSizeKey = "mediana";
  modalQuantity = 1;

  const initialImg = (product.packagingImages && product.packagingImages[selectedModalPackagingModel])
    ? product.packagingImages[selectedModalPackagingModel]
    : product.image;

  document.getElementById("modalImg").src = initialImg;
  document.getElementById("modalImg").alt = product.name;
  document.getElementById("modalCategoryBadge").textContent = "Envases con Tapa Hermética";
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDesc").textContent = product.description;
  document.getElementById("modalIngredients").textContent = product.ingredients;
  document.getElementById("modalQtyInput").value = modalQuantity;

  renderModalPackagingOptions();
  renderModalSizeOptions();
  updateModalSubtotal();

  const modal = document.getElementById("productModal");
  modal.classList.add("open");
}

// Abre el modal con un envase pre-seleccionado (desde los botones de la tarjeta del catálogo)
function openProductModalWithPackaging(productId, packagingKey) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeProductModal = product;
  selectedModalPackagingModel = packagingKey || "rectangular";
  selectedModalSizeKey = "mediana";
  modalQuantity = 1;

  const initialImg = (product.packagingImages && product.packagingImages[selectedModalPackagingModel])
    ? product.packagingImages[selectedModalPackagingModel]
    : product.image;

  document.getElementById("modalImg").src = initialImg;
  document.getElementById("modalImg").alt = product.name;
  document.getElementById("modalCategoryBadge").textContent = "Envases con Tapa Hermética";
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDesc").textContent = product.description;
  document.getElementById("modalIngredients").textContent = product.ingredients;
  document.getElementById("modalQtyInput").value = modalQuantity;

  renderModalPackagingOptions();
  renderModalSizeOptions();
  updateModalSubtotal();

  document.getElementById("productModal").classList.add("open");
}

function renderModalPackagingOptions() {
  const container = document.getElementById("modalPackagingOptions");
  if (!container) return;

  container.innerHTML = Object.keys(PACKAGING_MODELS).map(key => {
    const model = PACKAGING_MODELS[key];
    const isSelected = key === selectedModalPackagingModel;
    const selectedClass = isSelected ? "selected" : "";
    const radioIcon = isSelected ? "fa-solid fa-circle-check" : "fa-regular fa-circle";

    // Miniatura personalizada según el postre actual o foto genérica del envase
    const thumbImg = (activeProductModal && activeProductModal.packagingImages && activeProductModal.packagingImages[key])
      ? activeProductModal.packagingImages[key]
      : model.image;

    return `
      <div class="packaging-card ${selectedClass}" onclick="selectModalPackagingModel('${key}')" id="packOpt-${key}">
        <div class="packaging-card-top">
          <span class="packaging-card-radio"><i class="${radioIcon}"></i></span>
          <span class="packaging-badge-pill">${model.tag}</span>
        </div>
        <div class="packaging-card-thumb">
          <img src="${thumbImg}" alt="${model.name}">
          <button type="button" class="packaging-thumb-zoom" onclick="openPackagingLightbox(event, '${key}')" title="Ver foto ampliada">
            <i class="fa-solid fa-magnifying-glass-plus"></i> Ver
          </button>
        </div>
        <div class="packaging-card-info">
          <strong>${model.name}</strong>
          <p>${model.shortDesc}</p>
        </div>
      </div>
    `;
  }).join("");
}

function selectModalPackagingModel(key) {
  if (!PACKAGING_MODELS[key]) return;
  selectedModalPackagingModel = key;
  renderModalPackagingOptions();

  // Actualizar la foto principal del modal mostrando el postre en ese envase específico
  if (activeProductModal && activeProductModal.packagingImages && activeProductModal.packagingImages[key]) {
    document.getElementById("modalImg").src = activeProductModal.packagingImages[key];
  } else if (activeProductModal) {
    document.getElementById("modalImg").src = activeProductModal.image;
  }
}

function openPackagingLightbox(event, key) {
  if (event) event.stopPropagation();
  const model = PACKAGING_MODELS[key];
  if (!model) return;

  const lightbox = document.getElementById("packagingLightboxModal");
  const img = document.getElementById("packagingLightboxImg");
  const title = document.getElementById("packagingLightboxTitle");
  const desc = document.getElementById("packagingLightboxDesc");
  const selectBtn = document.getElementById("packagingLightboxSelectBtn");

  if (!lightbox) return;

  const previewImg = (activeProductModal && activeProductModal.packagingImages && activeProductModal.packagingImages[key])
    ? activeProductModal.packagingImages[key]
    : model.image;

  img.src = previewImg;
  img.alt = activeProductModal ? `${activeProductModal.name} en ${model.fullName}` : model.fullName;
  title.textContent = activeProductModal ? `${activeProductModal.name} en ${model.name}` : model.fullName;
  desc.textContent = activeProductModal 
    ? `Así se presenta y entrega ${activeProductModal.name} en ${model.fullName}. Con tapa hermética transparente que protege la frescura y la textura.`
    : model.fullDesc;

  selectBtn.onclick = () => {
    selectModalPackagingModel(key);
    closePackagingLightbox();
  };

  lightbox.classList.add("open");
}

function closePackagingLightbox() {
  const lightbox = document.getElementById("packagingLightboxModal");
  if (lightbox) lightbox.classList.remove("open");
}

function initPackagingLightboxEvents() {
  const lightbox = document.getElementById("packagingLightboxModal");
  const closeBtn = document.getElementById("packagingLightboxCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", closePackagingLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closePackagingLightbox();
    });
  }
}

// ==========================================================================
// 6.B. MODAL DE PRECIOS POR MODELO DE BANDEJA / ENVASE
// ==========================================================================
function openPackagingPricingModal(packagingKey) {
  const model = PACKAGING_MODELS[packagingKey] || PACKAGING_MODELS.rectangular;
  const modal = document.getElementById("packagingPricingModal");
  if (!modal) return;

  const isRectangular = (model.id === "rectangular");

  document.getElementById("packPricingBadge").innerHTML = isRectangular
    ? `<i class="fa-solid fa-layer-group"></i> Opción 1: Formato Clásico`
    : `<i class="fa-solid fa-bowl-food"></i> Opción 2: Formato Circular`;

  document.getElementById("packPricingTitle").textContent = isRectangular
    ? `Postres y Precios en Bandeja Rectangular con Tapa`
    : `Postres y Precios en Pote Redondo / Bowl con Tapa`;

  document.getElementById("packPricingSubtitle").textContent = isRectangular
    ? `Bandeja cristal con tapa bisagra domo hermética. Ideal para apreciar las capas prolijas y cortar porciones uniformes.`
    : `Pote cristal acanalado con tapa hermética a presión antiderrame. Práctico para servir, llevar y cucharear directo.`;

  // Banner superior con imagen del envase y detalles
  const bannerEl = document.getElementById("packPricingBanner");
  bannerEl.innerHTML = `
    <div class="pack-pricing-thumb-wrap">
      <img src="${model.image}" alt="${model.fullName}">
      <span class="pack-pricing-thumb-badge">${model.tag}</span>
    </div>
    <div class="pack-pricing-banner-text">
      <h4>${model.fullName}</h4>
      <p>${model.fullDesc}</p>
      <div class="pack-pricing-banner-tags">
        <span class="mini-tag"><i class="fa-solid fa-shield-halved"></i> 100% Hermético</span>
        <span class="mini-tag"><i class="fa-solid fa-snowflake"></i> Apto Heladera</span>
        <span class="mini-tag"><i class="fa-solid fa-check"></i> Sin devolver recipientes</span>
      </div>
    </div>
  `;

  // Renderizar los 4 postres disponibles con sus precios por tamaño y foto física en el envase
  const listEl = document.getElementById("packPricingProductsList");
  listEl.innerHTML = PRODUCTS.map(prod => {
    const sizeKeys = Object.keys(prod.sizes);
    // Foto real del postre dentro del envase seleccionado
    const dessertInPackagingImg = (prod.packagingImages && prod.packagingImages[model.id]) 
      ? prod.packagingImages[model.id] 
      : prod.image;

    const sizesHtml = sizeKeys.map(k => {
      const s = prod.sizes[k];
      return `
        <div class="pack-prod-price-pill" onclick="selectAndOrderProductFromPackModal('${prod.id}', '${model.id}', '${k}')" title="Pedir ${prod.name} en ${s.name}">
          <div class="pill-size-header">
            <span class="pill-size-name">${s.name}</span>
            <span class="pill-portions">${s.portions}</span>
          </div>
          <div class="pill-price-val">${formatCurrency(s.price)}</div>
          <span class="pill-order-cta"><i class="fa-solid fa-cart-plus"></i> Elegir</span>
        </div>
      `;
    }).join("");

    return `
      <div class="pack-pricing-product-card">
        <div class="pack-pricing-prod-media">
          <img src="${dessertInPackagingImg}" alt="${prod.name} presentado en ${model.fullName}" class="pack-pricing-dessert-img">
          <span class="pack-pricing-prod-badge">${prod.badge}</span>
          <button type="button" class="btn-zoom-dessert-pack" onclick="openPhysicalPreviewModal('${prod.id}', '${model.id}')" title="Ampliar vista física del postre en bandeja">
            <i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto real
          </button>
        </div>
        <div class="pack-pricing-prod-body">
          <div class="pack-pricing-prod-header">
            <h4>${prod.name}</h4>
            <span class="pack-pricing-prod-cat"><i class="fa-solid fa-box-open"></i> Presentado en ${model.name}</span>
          </div>
          <p class="pack-pricing-prod-desc">${prod.description}</p>
          
          <div class="pack-pricing-sizes-row">
            <span class="pack-pricing-sizes-label"><i class="fa-solid fa-tags text-gold"></i> Precios en ${model.name}:</span>
            <div class="pack-pricing-pills-grid">
              ${sizesHtml}
            </div>
          </div>

          <div class="pack-pricing-prod-actions">
            <button type="button" class="btn btn-outline btn-sm" onclick="openPhysicalPreviewModal('${prod.id}', '${model.id}')">
              <i class="fa-solid fa-eye"></i> Ver cómo se ve físicamente
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="selectAndOrderProductFromPackModal('${prod.id}', '${model.id}', 'mediana')">
              <i class="fa-solid fa-cart-plus"></i> Pedir ${prod.name}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  modal.classList.add("open");
}

function closePackagingPricingModal() {
  const modal = document.getElementById("packagingPricingModal");
  if (modal) modal.classList.remove("open");
}

function initPackagingPricingModalEvents() {
  const modal = document.getElementById("packagingPricingModal");
  const closeBtn = document.getElementById("packagingPricingCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", closePackagingPricingModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closePackagingPricingModal();
    });
  }
}

// Al hacer clic en un postre o tamaño dentro del modal de precios de bandeja, abre el modal de producto configurado
function selectAndOrderProductFromPackModal(productId, packagingKey, sizeKey) {
  closePackagingPricingModal();
  openProductModalWithPackaging(productId, packagingKey);
  if (sizeKey) {
    selectModalSize(sizeKey);
  }
}

// Vista ampliada de cómo se ve el postre adentro de la bandeja seleccionada
function openPhysicalPreviewModal(productId, packagingKey) {
  const product = PRODUCTS.find(p => p.id === productId);
  const model = PACKAGING_MODELS[packagingKey] || PACKAGING_MODELS.rectangular;
  if (!product) return;

  // Cerramos temporalmente el modal de lista si estaba abierto para que no quede detrás
  closePackagingPricingModal();

  const lightbox = document.getElementById("packagingLightboxModal");
  const img = document.getElementById("packagingLightboxImg");
  const title = document.getElementById("packagingLightboxTitle");
  const desc = document.getElementById("packagingLightboxDesc");
  const selectBtn = document.getElementById("packagingLightboxSelectBtn");

  if (!lightbox) return;

  const previewImg = (product.packagingImages && product.packagingImages[model.id])
    ? product.packagingImages[model.id]
    : product.image;

  img.src = previewImg;
  img.alt = `${product.name} en ${model.fullName}`;
  title.innerHTML = `Vista Real: <strong>${product.name}</strong> en ${model.name}`;
  desc.textContent = `Así se entrega tu ${product.name} adentro de la ${model.fullName}. Con tapa hermética reforzada que mantiene la textura, la crema y la humedad fresca hasta tu mesa.`;

  selectBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Pedir ${product.name} en ${model.name}`;
  selectBtn.onclick = () => {
    closePackagingLightbox();
    selectAndOrderProductFromPackModal(product.id, model.id, "mediana");
  };

  lightbox.classList.add("open");
}

function renderModalSizeOptions() {
  const sizeContainer = document.getElementById("modalSizeOptions");
  if (!activeProductModal || !sizeContainer) return;

  const sizes = activeProductModal.sizes;
  sizeContainer.innerHTML = Object.keys(sizes).map(key => {
    const size = sizes[key];
    const isSelected = key === selectedModalSizeKey ? "selected" : "";
    return `
      <div class="size-option-card ${isSelected}" onclick="selectModalSize('${key}')">
        <span class="size-option-name">${size.name}</span>
        <span class="size-option-portions">${size.portions}</span>
        <span class="size-option-price">${formatCurrency(size.price)}</span>
      </div>
    `;
  }).join("");
}

function selectModalSize(key) {
  selectedModalSizeKey = key;
  renderModalSizeOptions();
  updateModalSubtotal();
}

function updateModalSubtotal() {
  if (!activeProductModal) return;
  const unitPrice = activeProductModal.sizes[selectedModalSizeKey].price;
  const subtotal = unitPrice * modalQuantity;
  document.getElementById("modalSubtotalPrice").textContent = formatCurrency(subtotal);
}

function initModalEvents() {
  const modal = document.getElementById("productModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  const minusBtn = document.getElementById("qtyMinusBtn");
  const plusBtn = document.getElementById("qtyPlusBtn");
  const addBtn = document.getElementById("modalAddToCartBtn");

  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  minusBtn.addEventListener("click", () => {
    if (modalQuantity > 1) {
      modalQuantity--;
      document.getElementById("modalQtyInput").value = modalQuantity;
      updateModalSubtotal();
    }
  });

  plusBtn.addEventListener("click", () => {
    if (modalQuantity < 10) {
      modalQuantity++;
      document.getElementById("modalQtyInput").value = modalQuantity;
      updateModalSubtotal();
    }
  });

  addBtn.addEventListener("click", () => {
    if (!activeProductModal) return;
    const sizeObj = activeProductModal.sizes[selectedModalSizeKey];
    const packObj = PACKAGING_MODELS[selectedModalPackagingModel] || PACKAGING_MODELS.rectangular;

    const cartImg = (activeProductModal.packagingImages && activeProductModal.packagingImages[selectedModalPackagingModel])
      ? activeProductModal.packagingImages[selectedModalPackagingModel]
      : activeProductModal.image;

    addToCart({
      id: `${activeProductModal.id}-${selectedModalSizeKey}-${selectedModalPackagingModel}`,
      productId: activeProductModal.id,
      name: activeProductModal.name,
      packagingModelKey: selectedModalPackagingModel,
      packagingModel: packObj.fullName,
      packagingModelShort: packObj.name,
      sizeKey: selectedModalSizeKey,
      sizeName: sizeObj.name,
      portions: sizeObj.portions,
      price: sizeObj.price,
      quantity: modalQuantity,
      image: cartImg
    });

    modal.classList.remove("open");
    showToast(`¡${activeProductModal.name} (${packObj.name}) agregado al carrito!`);
    openCartDrawer();
  });
}
}

// ==========================================================================
// 7. GESTIÓN DEL CARRITO
// ==========================================================================
function addToCart(newItem) {
  const existing = cart.find(item => item.id === newItem.id);
  if (existing) {
    existing.quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("dulce_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const countBadge = document.getElementById("cartBadgeCount");
  const cartList = document.getElementById("cartItemsList");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartExtrasTotalEl = document.getElementById("cartExtrasTotal");
  const cartGrandTotalEl = document.getElementById("cartGrandTotal");

  const totalItemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  if (countBadge) countBadge.textContent = totalItemsCount;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-cake-candles"></i>
        <h4>Tu carrito está vacío</h4>
        <p>Elegí una o más bandejas de plástico de Tiramisú, Chocotorta o Brownies para tu pedido.</p>
        <a href="#catalogo" class="btn btn-outline btn-block" onclick="closeCartDrawer()">Ver Catálogo</a>
      </div>
    `;
    cartSubtotalEl.textContent = "$0";
    cartExtrasTotalEl.textContent = "$0";
    cartGrandTotalEl.textContent = "$0";
    return;
  }

  cartList.innerHTML = cart.map(item => `
    <div class="cart-item-card">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-packaging-tag">
          <i class="fa-solid fa-box"></i> ${item.packagingModelShort || item.packagingModel || "Bandeja Rectangular"}
        </div>
        <div class="cart-item-meta">${item.sizeName} (${item.portions}) • Cant: <strong>${item.quantity}</strong></div>
        <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
      </div>
      <button class="cart-item-delete" onclick="removeFromCart('${item.id}')" title="Eliminar">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join("");

  const subtotalProducts = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const extrasTotal = calculateExtrasTotal();
  const deliveryCost = calculateDeliveryCost();
  const grandTotal = subtotalProducts + extrasTotal + deliveryCost;

  cartSubtotalEl.textContent = formatCurrency(subtotalProducts);
  cartExtrasTotalEl.textContent = formatCurrency(extrasTotal);

  const deliveryEl = document.getElementById("cartDeliveryCost");
  if (deliveryEl) {
    const select = document.getElementById("custDeliveryType");
    const optVal = select ? select.value : "";
    if (deliveryCost > 0) {
      deliveryEl.textContent = formatCurrency(deliveryCost);
      deliveryEl.className = "text-gold font-bold";
    } else if (optVal.includes("Retiro")) {
      deliveryEl.textContent = "¡Gratis (Retiro)!";
      deliveryEl.className = "text-success font-bold";
    } else {
      deliveryEl.textContent = "A coordinar";
      deliveryEl.className = "text-gold";
    }
  }

  cartGrandTotalEl.textContent = formatCurrency(grandTotal);
}

function calculateExtrasTotal() {
  let total = 0;
  const candle = document.getElementById("extraCandle");
  const spoons = document.getElementById("extraSpoons");
  if (candle && candle.checked) total += parseInt(candle.dataset.price || 0, 10);
  if (spoons && spoons.checked) total += parseInt(spoons.dataset.price || 0, 10);
  return total;
}

function calculateDeliveryCost() {
  const select = document.getElementById("custDeliveryType");
  if (!select || !select.selectedOptions || !select.selectedOptions[0]) return 0;
  return parseInt(select.selectedOptions[0].dataset.cost || 0, 10);
}

function initCartDrawerEvents() {
  const overlay = document.getElementById("cartOverlay");
  const openBtn = document.getElementById("cartOpenBtn");
  const closeBtn = document.getElementById("cartCloseBtn");
  const btnSendWhatsApp = document.getElementById("btnSendWhatsApp");
  const deliverySelect = document.getElementById("custDeliveryType");
  const btnCopyAlias = document.getElementById("btnCopyAlias");
  const btnShareGroup = document.getElementById("btnShareGroup");

  openBtn.addEventListener("click", openCartDrawer);
  closeBtn.addEventListener("click", closeCartDrawer);
  overlay.addEventListener("click", closeCartDrawer);

  // Escuchar cambios en extras
  const extraCheckboxes = document.querySelectorAll("#cartExtras input[type='checkbox']");
  extraCheckboxes.forEach(chk => {
    chk.addEventListener("change", updateCartUI);
  });

  // Escuchar cambios en zona de entrega
  if (deliverySelect) {
    deliverySelect.addEventListener("change", updateCartUI);
  }

  // Configurar fecha mínima de entrega (mañana, mínimo 24hs)
  const dateInput = document.getElementById("custDateInput");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    dateInput.min = minDateStr;
    dateInput.value = minDateStr;
  }

  // Botón Copiar Alias Mercado Pago
  if (btnCopyAlias) {
    btnCopyAlias.addEventListener("click", () => {
      const aliasCode = document.getElementById("mpAliasCode")?.textContent || "DULCE.MILLONARIO.MP";
      navigator.clipboard.writeText(aliasCode).then(() => {
        showToast("¡Alias DULCE.MILLONARIO.MP copiado al portapapeles!");
      }).catch(() => {
        showToast("Alias de Seña: DULCE.MILLONARIO.MP");
      });
    });
  }

  // Botón Compartir al Grupo de Amigos por WhatsApp
  if (btnShareGroup) {
    btnShareGroup.addEventListener("click", () => {
      const text = encodeURIComponent("¡Miren los postres en bandeja de *Dulce Millonario* para el finde futbolero! 🍰 Tiramisú, Chocotorta y Ensalada de Frutas: " + window.location.href);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    });
  }

  btnSendWhatsApp.addEventListener("click", handleWhatsAppCheckout);
}

function openCartDrawer() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

// ==========================================================================
// 8. CHECKOUT DIRECTO A WHATSAPP (3757 466613)
// ==========================================================================
function handleWhatsAppCheckout() {
  if (cart.length === 0) {
    alert("¡Tu carrito está vacío! Por favor agregá al menos una bandeja para hacer tu encargo.");
    return;
  }

  const name = document.getElementById("custName").value.trim();
  const dateVal = document.getElementById("custDateInput") ? document.getElementById("custDateInput").value : "";
  const timeVal = document.getElementById("custTimeInput") ? document.getElementById("custTimeInput").value : "16:00";
  const deliverySelect = document.getElementById("custDeliveryType");
  const deliveryType = deliverySelect ? deliverySelect.value : "Retiro";
  const deliveryCost = calculateDeliveryCost();
  const notes = document.getElementById("custNotes").value.trim();

  if (!name) {
    alert("Por favor ingresá tu nombre y apellido para poder registrar tu pedido.");
    document.getElementById("custName").focus();
    return;
  }

  if (!dateVal) {
    alert("Por favor seleccioná la fecha de entrega (mínimo 24hs de anticipación).");
    document.getElementById("custDateInput").focus();
    return;
  }

  // Formatear fecha legible
  const dateParts = dateVal.split("-");
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : dateVal;

  const extrasSelected = [];
  const candle = document.getElementById("extraCandle");
  const spoons = document.getElementById("extraSpoons");
  const giftCard = document.getElementById("extraGiftCard");

  if (candle && candle.checked) extrasSelected.push(`• ${candle.dataset.name} (${formatCurrency(parseInt(candle.dataset.price))})`);
  if (spoons && spoons.checked) extrasSelected.push(`• ${spoons.dataset.name} (${formatCurrency(parseInt(spoons.dataset.price))})`);
  if (giftCard && giftCard.checked) extrasSelected.push(`• ${giftCard.dataset.name} (Gratis)`);

  const subtotalProducts = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const extrasTotal = calculateExtrasTotal();
  const grandTotal = subtotalProducts + extrasTotal + deliveryCost;

  let message = `¡Hola *${CONFIG.businessName}*! 👋 Quisiera encargar el siguiente pedido de postres en bandeja:\n\n`;
  message += `👤 *Cliente:* ${name}\n`;
  message += `📅 *Fecha:* ${formattedDate} a las ${timeVal} hs\n`;
  message += `🛵 *Modalidad / Zona:* ${deliveryType}\n\n`;
  message += `🍰 *DETALLE DEL PEDIDO:*\n`;

  cart.forEach(item => {
    const packagingText = item.packagingModel || item.packagingModelShort || "Bandeja Rectangular con tapa hermética";
    message += `▪️ ${item.quantity}x ${item.name}\n`;
    message += `   - Envase: ${packagingText}\n`;
    message += `   - Tamaño: ${item.sizeName} (${item.portions}) -> ${formatCurrency(item.price * item.quantity)}\n`;
  });

  if (extrasSelected.length > 0) {
    message += `\n🎁 *EXTRAS SUMADOS:*\n`;
    extrasSelected.forEach(ext => message += `${ext}\n`);
  }

  if (deliveryCost > 0) {
    message += `\n🛵 *Costo de Envío:* ${formatCurrency(deliveryCost)}\n`;
  }

  if (notes) {
    message += `\n📝 *Notas / Dirección:* "${notes}"\n`;
  }

  message += `\n💰 *TOTAL ESTIMADO: ${formatCurrency(grandTotal)}*\n`;
  message += `💳 *Alias para seña (50%):* DULCE.MILLONARIO.MP\n\n`;
  message += `¿Tienen disponibilidad para esa fecha? ¡Muchas gracias! 😊`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

  window.open(waUrl, "_blank");
}

// ==========================================================================
// 9. CALCULADORA DE PORCIONES
// ==========================================================================
function initCalculator() {
  const range = document.getElementById("guestRange");
  const display = document.getElementById("guestDisplay");
  const sweetLevel = document.getElementById("sweetToothLevel");

  if (!range) return;

  function calculateRecommendation() {
    const guests = parseInt(range.value, 10);
    const isGoloso = sweetLevel.value === "golosos";
    display.textContent = `${guests} personas`;

    const effectivePortions = isGoloso ? Math.round(guests * 1.3) : guests;
    let recommendationHTML = "";

    if (effectivePortions <= 6) {
      recommendationHTML = `
        <p>👉 Te sugerimos <strong>1 Bandeja Chica de plástico (4 a 6 porciones)</strong> de Tiramisú o Chocotorta.</p>
        <small class="text-gold">Práctica, con tapa hermética para refrigerar directamente.</small>
      `;
    } else if (effectivePortions <= 10) {
      recommendationHTML = `
        <p>👉 Te sugerimos <strong>1 Bandeja Mediana de plástico (8 a 10 porciones)</strong>.</p>
        <small class="text-gold">O <strong>2 Bandejas Chicas</strong> si querés combinar sabores (ej. Chocotorta + Tiramisú de Oreo).</small>
      `;
    } else if (effectivePortions <= 18) {
      recommendationHTML = `
        <p>👉 Te sugerimos <strong>1 Bandeja Familiar Grande (15 a 18 porciones)</strong> o <strong>2 Bandejas Medianas</strong> para variedad.</p>
      `;
    } else if (effectivePortions <= 30) {
      recommendationHTML = `
        <p>👉 Te sugerimos <strong>2 Bandejas Familiares Grandes</strong> (~32 porciones) o <strong>3 Bandejas Medianas</strong> surtidas.</p>
      `;
    } else {
      const traysGrandes = Math.ceil(effectivePortions / 16);
      recommendationHTML = `
        <p>👉 Para un festejo de ${guests} personas, te recomendamos <strong>${traysGrandes} Bandejas Familiares</strong> combinando Tiramisú, Brownies y Chocotorta.</p>
      `;
    }

    document.getElementById("resultDetails").innerHTML = recommendationHTML;
  }

  range.addEventListener("input", calculateRecommendation);
  sweetLevel.addEventListener("change", calculateRecommendation);
  calculateRecommendation();
}

// ==========================================================================
// 10. ACORDEÓN PREGUNTAS FRECUENTES
// ==========================================================================
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-body").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

// ==========================================================================
// 11. MENÚ MÓVIL Y TOAST NOTIFIER
// ==========================================================================
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}


// ==========================================================================
// 12. PANEL PRIVADO DE COSTOS Y RENTABILIDAD (ADMINISTRACIÓN)
// ==========================================================================

// Contraseña por defecto y clave de guardado
const DEFAULT_ADMIN_PASS = "Viva Peron";

// Plantillas de costos de ingredientes iniciales por producto (Base: Bandeja Mediana)
const DEFAULT_VARIABLE_RECIPES = {
  "tiramisu": [
    { name: "Vainillas artesanales (x2 paquetes)", cost: 2200 },
    { name: "Queso tipo mascarpone / crema suave (500g)", cost: 4800 },
    { name: "Café espresso de especialidad + licor dulce", cost: 1300 },
    { name: "Cacao amargo belga premium", cost: 900 },
    { name: "Azúcar, huevos de campo y esencia", cost: 1200 },
    { name: "Bandeja plástica cristal con tapa hermética", cost: 1200 },
    { name: "Etiqueta / sticker de seguridad y cierre", cost: 400 }
  ],
  "chocotorta": [
    { name: "Galletitas Chocolinas originales (x3 paquetes)", cost: 3300 },
    { name: "Dulce de leche repostero colonial (600g)", cost: 3600 },
    { name: "Queso crema suave primera marca (400g)", cost: 3200 },
    { name: "Leche chocolatada o café para humedecer", cost: 800 },
    { name: "Chocolate cobertura raspado para decoración", cost: 900 },
    { name: "Bandeja plástica cristal con tapa hermética", cost: 1200 },
    { name: "Etiqueta / sticker de seguridad y cierre", cost: 400 }
  ],
  "tiramisu-oreo": [
    { name: "Galletitas Oreo originales (x3 paquetes)", cost: 3600 },
    { name: "Crema tipo mascarpone suave a punto nieve", cost: 4600 },
    { name: "Crema de leche fresca (350ml)", cost: 2400 },
    { name: "Café suave con toque de vainilla", cost: 800 },
    { name: "Bandeja plástica cristal con tapa hermética", cost: 1200 },
    { name: "Etiqueta / sticker de seguridad y cierre", cost: 400 }
  ],
  "brownies": [
    { name: "Chocolate semi amargo 60% (300g)", cost: 3800 },
    { name: "Manteca de primera calidad (200g)", cost: 2200 },
    { name: "Cacao amargo, harina, azúcar y huevos", cost: 1900 },
    { name: "Dulce de leche repostero (400g)", cost: 2400 },
    { name: "Nueces seleccionadas (opcionales)", cost: 1500 },
    { name: "Bandeja plástica cristal con tapa hermética", cost: 1200 },
    { name: "Etiqueta / sticker de seguridad y cierre", cost: 400 }
  ],
  "ensalada-frutas": [
    { name: "Bananas frescas seleccionadas", cost: 1200 },
    { name: "Manzanas rojas y verdes crujientes", cost: 1500 },
    { name: "Naranjas dulces (gajos y jugo natural)", cost: 1400 },
    { name: "Pote plástico acanalado con tapa hermética", cost: 900 },
    { name: "Etiqueta / sticker de seguridad y cierre", cost: 400 }
  ]
};

// Factores de escala para tamaño de bandeja plástica
const SIZE_FACTORS = {
  "chica": 0.62,    // 4-6 porciones
  "mediana": 1.0,   // 8-10 porciones
  "grande": 1.65    // 15-18 porciones
};

// Estado del Panel de Costos
let adminState = {
  activeProduct: "tiramisu",
  activeSize: "mediana",
  targetMargin: 60,
  fixedCosts: JSON.parse(localStorage.getItem("dulce_fixed_costs")) || {
    electricity: 18000,
    gas: 8000,
    ads: 12000,
    equipment: 6000,
    salary: 60000,
    other: 5000,
    monthlyTrays: 50
  },
  recipes: JSON.parse(localStorage.getItem("dulce_variable_recipes")) || DEFAULT_VARIABLE_RECIPES
};

function getAdminPassword() {
  const stored = localStorage.getItem("dulce_admin_password");
  if (!stored || stored === "dulce2026") {
    return DEFAULT_ADMIN_PASS;
  }
  return stored;
}

// Normaliza texto para comparar ignorando mayúsculas y acentos
function normalizePassword(str) {
  return (str || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isAdminSessionActive() {
  return sessionStorage.getItem("dulce_admin_session") === "true";
}

function setAdminSession(active) {
  if (active) {
    sessionStorage.setItem("dulce_admin_session", "true");
  } else {
    sessionStorage.removeItem("dulce_admin_session");
  }
}

// Inicialización de Eventos del Panel de Costos
function initAdminCostPanel() {
  const adminNavBtn = document.getElementById("adminNavBtn");
  const footerAdminLink = document.getElementById("footerAdminLink");
  const loginModal = document.getElementById("adminLoginModal");
  const costModal = document.getElementById("adminCostModal");
  const loginCloseBtn = document.getElementById("adminLoginCloseBtn");
  const costCloseBtn = document.getElementById("adminCostCloseBtn");
  const logoutBtn = document.getElementById("adminLogoutBtn");
  const loginForm = document.getElementById("adminLoginForm");
  const togglePassBtn = document.getElementById("togglePasswordVisibility");

  // Botón abrir panel (nav y footer)
  const handleOpenClick = (e) => {
    e.preventDefault();
    if (isAdminSessionActive()) {
      openAdminCostModal();
    } else {
      openAdminLoginModal();
    }
  };

  if (adminNavBtn) adminNavBtn.addEventListener("click", handleOpenClick);
  if (footerAdminLink) footerAdminLink.addEventListener("click", handleOpenClick);

  // Cerrar modales
  if (loginCloseBtn) loginCloseBtn.addEventListener("click", () => loginModal.classList.remove("open"));
  if (costCloseBtn) costCloseBtn.addEventListener("click", () => costModal.classList.remove("open"));

  // Toggle visibilidad contraseña
  if (togglePassBtn) {
    togglePassBtn.addEventListener("click", () => {
      const passInput = document.getElementById("adminPasswordInput");
      const icon = togglePassBtn.querySelector("i");
      if (passInput.type === "password") {
        passInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        passInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }

  // Submit Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPass = document.getElementById("adminPasswordInput").value;
      const errorMsg = document.getElementById("adminLoginError");

      if (normalizePassword(enteredPass) === normalizePassword(getAdminPassword())) {
        errorMsg.textContent = "";
        setAdminSession(true);
        loginModal.classList.remove("open");
        document.getElementById("adminPasswordInput").value = "";
        openAdminCostModal();
        showToast("¡Sesión iniciada en el Panel de Costos!");
      } else {
        errorMsg.textContent = "Contraseña incorrecta. Por favor volvé a intentar.";
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setAdminSession(false);
      costModal.classList.remove("open");
      showToast("Sesión del panel de costos cerrada.");
    });
  }

  // Navegación de pestañas en el dashboard
  const tabButtons = document.querySelectorAll(".admin-tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".admin-tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add("active");

      if (btn.dataset.tab === "tabResumen") {
        renderAllDessertsSummaryTable();
      }
    });
  });

  // Eventos de selección de producto y tamaño en pestaña 1
  const prodSelect = document.getElementById("costProductSelect");
  const sizeSelect = document.getElementById("costSizeSelect");
  const marginRange = document.getElementById("targetMarginRange");

  if (prodSelect) {
    prodSelect.addEventListener("change", (e) => {
      adminState.activeProduct = e.target.value;
      renderCurrentRecipeIngredients();
      recalculateCurrentCosts();
    });
  }

  if (sizeSelect) {
    sizeSelect.addEventListener("change", (e) => {
      adminState.activeSize = e.target.value;
      renderCurrentRecipeIngredients();
      recalculateCurrentCosts();
    });
  }

  if (marginRange) {
    marginRange.addEventListener("input", (e) => {
      adminState.targetMargin = parseInt(e.target.value, 10);
      document.getElementById("marginDisplay").textContent = `${adminState.targetMargin}%`;
      recalculateCurrentCosts();
    });
  }

  // Botón agregar insumo
  const btnAddRow = document.getElementById("btnAddIngredientRow");
  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      const activeRecipe = adminState.recipes[adminState.activeProduct];
      if (activeRecipe) {
        activeRecipe.push({ name: "Nuevo insumo", cost: 1000 });
        renderCurrentRecipeIngredients();
        recalculateCurrentCosts();
      }
    });
  }

  // Botón guardar receta de postre
  const btnSaveRecipe = document.getElementById("btnSaveCostRecipe");
  if (btnSaveRecipe) {
    btnSaveRecipe.addEventListener("click", () => {
      localStorage.setItem("dulce_variable_recipes", JSON.stringify(adminState.recipes));
      showToast("¡Costos del postre guardados exitosamente!");
      renderAllDessertsSummaryTable();
    });
  }

  // Botón guardar costos fijos
  const btnSaveFixed = document.getElementById("btnSaveFixedCosts");
  if (btnSaveFixed) {
    btnSaveFixed.addEventListener("click", () => {
      saveFixedCostsFromInputs();
      showToast("¡Costos fijos actualizados!");
      recalculateCurrentCosts();
      renderAllDessertsSummaryTable();
    });
  }

  // Botón Imprimir / Exportar Reporte de Costos
  const btnPrint = document.getElementById("btnPrintCostSheet");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  // Inputs de costos fijos para actualizar en vivo
  const fixedInputs = document.querySelectorAll(".fixed-costs-inputs input");
  fixedInputs.forEach(input => {
    input.addEventListener("input", () => {
      updateFixedCostsSummary();
      recalculateCurrentCosts();
    });
  });

  // Formulario cambio de contraseña
  const passChangeForm = document.getElementById("adminPasswordChangeForm");
  if (passChangeForm) {
    passChangeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const current = document.getElementById("currentPasswordInput").value;
      const newPass = document.getElementById("newPasswordInput").value;

      if (current !== getAdminPassword()) {
        alert("La contraseña actual no es correcta.");
        return;
      }
      if (newPass.length < 4) {
        alert("La nueva contraseña debe tener al menos 4 caracteres.");
        return;
      }

      localStorage.setItem("dulce_admin_password", newPass);
      passChangeForm.reset();
      showToast("¡Contraseña de acceso actualizada correctamente!");
    });
  }
}

function openAdminLoginModal() {
  document.getElementById("adminLoginError").textContent = "";
  document.getElementById("adminLoginModal").classList.add("open");
  setTimeout(() => {
    document.getElementById("adminPasswordInput").focus();
  }, 200);
}

function openAdminCostModal() {
  populateFixedCostsInputs();
  updateFixedCostsSummary();
  renderCurrentRecipeIngredients();
  recalculateCurrentCosts();
  document.getElementById("adminCostModal").classList.add("open");
}

// ==========================================================================
// CÁLCULOS DE COSTOS FIJOS
// ==========================================================================
function populateFixedCostsInputs() {
  const fc = adminState.fixedCosts;
  document.getElementById("fixedElectricity").value = fc.electricity;
  document.getElementById("fixedGas").value = fc.gas;
  document.getElementById("fixedAds").value = fc.ads;
  document.getElementById("fixedEquipment").value = fc.equipment;
  document.getElementById("fixedSalary").value = fc.salary;
  document.getElementById("fixedOther").value = fc.other;
  document.getElementById("fixedMonthlyTrays").value = fc.monthlyTrays;
}

function saveFixedCostsFromInputs() {
  adminState.fixedCosts = {
    electricity: parseFloat(document.getElementById("fixedElectricity").value) || 0,
    gas: parseFloat(document.getElementById("fixedGas").value) || 0,
    ads: parseFloat(document.getElementById("fixedAds").value) || 0,
    equipment: parseFloat(document.getElementById("fixedEquipment").value) || 0,
    salary: parseFloat(document.getElementById("fixedSalary").value) || 0,
    other: parseFloat(document.getElementById("fixedOther").value) || 0,
    monthlyTrays: parseInt(document.getElementById("fixedMonthlyTrays").value, 10) || 1
  };
  localStorage.setItem("dulce_fixed_costs", JSON.stringify(adminState.fixedCosts));
  updateFixedCostsSummary();
}

function getFixedCostMetrics() {
  const fc = adminState.fixedCosts;
  const totalMonthly = (parseFloat(document.getElementById("fixedElectricity")?.value) || fc.electricity) +
                       (parseFloat(document.getElementById("fixedGas")?.value) || fc.gas) +
                       (parseFloat(document.getElementById("fixedAds")?.value) || fc.ads) +
                       (parseFloat(document.getElementById("fixedEquipment")?.value) || fc.equipment) +
                       (parseFloat(document.getElementById("fixedSalary")?.value) || fc.salary) +
                       (parseFloat(document.getElementById("fixedOther")?.value) || fc.other);

  const monthlyTrays = parseInt(document.getElementById("fixedMonthlyTrays")?.value, 10) || fc.monthlyTrays || 1;
  const fixedPerTray = Math.round(totalMonthly / Math.max(1, monthlyTrays));

  return { totalMonthly, monthlyTrays, fixedPerTray };
}

function updateFixedCostsSummary() {
  const { totalMonthly, fixedPerTray } = getFixedCostMetrics();
  const totalEl = document.getElementById("fixedTotalMonthly");
  const unitResultEl = document.getElementById("fixedPerUnitResult");
  const echoEl = document.getElementById("fixedPerUnitEcho");

  if (totalEl) totalEl.textContent = formatCurrency(totalMonthly);
  if (unitResultEl) unitResultEl.textContent = formatCurrency(fixedPerTray);
  if (echoEl) echoEl.textContent = formatCurrency(fixedPerTray);
}

// ==========================================================================
// RENDER Y CÁLCULO DE COSTOS VARIABLES
// ==========================================================================
function renderCurrentRecipeIngredients() {
  const listBody = document.getElementById("ingredientsListBody");
  if (!listBody) return;

  const currentRecipe = adminState.recipes[adminState.activeProduct] || [];
  const factor = SIZE_FACTORS[adminState.activeSize] || 1.0;

  listBody.innerHTML = currentRecipe.map((item, index) => {
    // Calculamos el costo escalado al tamaño de bandeja plástica
    const scaledCost = Math.round(item.cost * factor);
    return `
      <tr>
        <td>
          <input type="text" value="${item.name}" onchange="updateIngredientName(${index}, this.value)">
        </td>
        <td>
          <input type="number" min="0" step="50" value="${scaledCost}" oninput="updateIngredientCost(${index}, this.value)">
        </td>
        <td style="text-align: center;">
          <button type="button" class="btn-del-row" onclick="deleteIngredientRow(${index})" title="Eliminar fila">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function updateIngredientName(index, newName) {
  const activeRecipe = adminState.recipes[adminState.activeProduct];
  if (activeRecipe && activeRecipe[index]) {
    activeRecipe[index].name = newName;
  }
}

function updateIngredientCost(index, newCost) {
  const activeRecipe = adminState.recipes[adminState.activeProduct];
  const factor = SIZE_FACTORS[adminState.activeSize] || 1.0;
  if (activeRecipe && activeRecipe[index]) {
    const parsed = parseFloat(newCost) || 0;
    // Guardamos normalizado a base Mediana
    activeRecipe[index].cost = Math.round(parsed / factor);
    recalculateCurrentCosts();
  }
}

function deleteIngredientRow(index) {
  const activeRecipe = adminState.recipes[adminState.activeProduct];
  if (activeRecipe && activeRecipe.length > 1) {
    activeRecipe.splice(index, 1);
    renderCurrentRecipeIngredients();
    recalculateCurrentCosts();
  } else {
    alert("Debe quedar al menos un insumo en la receta.");
  }
}

// ==========================================================================
// CÁLCULO PRINCIPAL DE COSTO TOTAL Y RENTABILIDAD
// ==========================================================================
function recalculateCurrentCosts() {
  const activeRecipe = adminState.recipes[adminState.activeProduct] || [];
  const factor = SIZE_FACTORS[adminState.activeSize] || 1.0;

  // 1. Costo Variable (insumos escalados)
  const variableCost = activeRecipe.reduce((sum, item) => sum + Math.round(item.cost * factor), 0);

  // 2. Costo Fijo por unidad
  const { fixedPerTray } = getFixedCostMetrics();

  // 3. COSTO TOTAL DEL PRODUCTO (Variable + Fijo)
  const totalCost = variableCost + fixedPerTray;

  // 4. Margen deseado y precio sugerido
  const marginPct = adminState.targetMargin;
  const suggestedPrice = Math.round(totalCost * (1 + marginPct / 100));
  const profitAmount = suggestedPrice - totalCost;

  // Actualizar datos en UI (KPIs)
  const prodObj = PRODUCTS.find(p => p.id === adminState.activeProduct);
  const sizeNames = { chica: "Bandeja Chica (Plástica)", mediana: "Bandeja Mediana (Plástica)", grande: "Bandeja Familiar (Plástica)" };

  document.getElementById("kpiProductName").textContent = prodObj ? prodObj.name : "Postre";
  document.getElementById("kpiSizeName").textContent = sizeNames[adminState.activeSize];

  document.getElementById("kpiVariableCost").textContent = formatCurrency(variableCost);
  document.getElementById("kpiFixedCostUnit").textContent = formatCurrency(fixedPerTray);
  document.getElementById("kpiTotalCost").textContent = formatCurrency(totalCost);
  document.getElementById("kpiSuggestedPrice").textContent = formatCurrency(suggestedPrice);
  document.getElementById("kpiProfitAmount").textContent = formatCurrency(profitAmount);

  // Comparar con el precio actual publicado en el catálogo
  const catalogPrice = prodObj && prodObj.sizes[adminState.activeSize] ? prodObj.sizes[adminState.activeSize].price : 0;
  const actualProfit = catalogPrice - totalCost;
  const actualMarginPct = totalCost > 0 ? Math.round((actualProfit / totalCost) * 100) : 0;

  const catalogPriceEl = document.getElementById("kpiCatalogPrice");
  const badgeEl = document.getElementById("catalogComparisonBadge");

  if (catalogPriceEl) catalogPriceEl.textContent = formatCurrency(catalogPrice);

  if (badgeEl) {
    if (actualProfit <= 0) {
      badgeEl.className = "comp-badge badge-danger";
      badgeEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ¡Pérdida! El costo total ($${formatCurrency(totalCost)}) supera tu precio actual.`;
    } else if (actualMarginPct < 40) {
      badgeEl.className = "comp-badge badge-warning";
      badgeEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Margen ajustado (+${actualMarginPct}%). Ganancia neta actual: ${formatCurrency(actualProfit)}`;
    } else {
      badgeEl.className = "comp-badge badge-success";
      badgeEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Margen saludable (+${actualMarginPct}%). Ganancia neta actual: ${formatCurrency(actualProfit)}`;
    }
  }
}

// ==========================================================================
// RESUMEN COMPARATIVO DE LOS 4 POSTRES (TAB 3)
// ==========================================================================
function renderAllDessertsSummaryTable() {
  const tableBody = document.getElementById("allDessertsSummaryBody");
  if (!tableBody) return;

  const { fixedPerTray } = getFixedCostMetrics();

  tableBody.innerHTML = PRODUCTS.map(prod => {
    const recipe = adminState.recipes[prod.id] || [];
    // Calculado para Bandeja Mediana (factor 1.0)
    const varCost = recipe.reduce((sum, item) => sum + item.cost, 0);
    const totCost = varCost + fixedPerTray;
    const catalogPrice = prod.sizes.mediana.price;
    const profit = catalogPrice - totCost;
    const marginPct = totCost > 0 ? Math.round((profit / totCost) * 100) : 0;

    const badgeClass = profit > 0 
      ? (marginPct >= 40 ? "text-success" : "text-gold") 
      : "text-danger";

    return `
      <tr>
        <td><strong>${prod.name}</strong> <small style="display:block; color:#777;">Bandeja Mediana (8-10 p.)</small></td>
        <td>${formatCurrency(varCost)}</td>
        <td>${formatCurrency(fixedPerTray)}</td>
        <td><strong style="color:var(--color-primary);">${formatCurrency(totCost)}</strong></td>
        <td><strong>${formatCurrency(catalogPrice)}</strong></td>
        <td><span class="${badgeClass}">${formatCurrency(profit)}</span></td>
        <td><span class="comp-badge ${profit > 0 ? (marginPct >= 40 ? 'badge-success' : 'badge-warning') : 'badge-danger'}">${marginPct}%</span></td>
      </tr>
    `;
  }).join("");
}
