/* =========================================================
   GreenNest — script.js
   Vanilla JS: product catalog, cart, wishlist, UI interactions
   ========================================================= */

/* ---------- Product catalog ---------- */
const PRODUCTS = [
  { id:"vs-01", name:"Heirloom Tomato Seeds", category:"Vegetable Seeds", price:129, oldPrice:179, rating:4.6, reviews:128, image:"images/Heirloom Tomato Seeds.jpg", badge:"best", desc:"Juicy, full-flavoured heirloom tomatoes bred for home gardens. High germination rate, non-GMO and open-pollinated.", stock:42, sku:"GN-VS-101" },
  { id:"vs-02", name:"Crunchy Carrot Seeds", category:"Vegetable Seeds", price:89, oldPrice:0, rating:4.3, reviews:64, image:"images/Crunchy Carrot Seeds.jpg", badge:"", desc:"Sweet, crisp carrots that thrive in containers or raised beds. Ready to harvest in 70 days.", stock:80, sku:"GN-VS-102" },
  { id:"vs-03", name:"Bell Pepper Seed Mix", category:"Vegetable Seeds", price:149, oldPrice:199, rating:4.7, reviews:95, image:"images/Bell Pepper Seed Mix.jpg", badge:"sale", desc:"A colourful mix of red, yellow and green bell peppers. Great for salads, stir-fry and stuffing.", stock:35, sku:"GN-VS-103" },
  { id:"vs-04", name:"Organic Spinach Seeds", category:"Vegetable Seeds", price:69, oldPrice:0, rating:4.4, reviews:51, image:"images/Organic Spinach Seeds.jpg", badge:"new", desc:"Fast-growing, nutrient-dense spinach perfect for a continuous salad harvest.", stock:64, sku:"GN-VS-104" },
  { id:"fs-01", name:"Marigold Flower Seeds", category:"Flower Seeds", price:99, oldPrice:139, rating:4.8, reviews:203, image:"images/marigold.jpg", badge:"best", desc:"Bright, pest-repelling marigolds that bloom all season. A must-have companion flower for any vegetable patch.", stock:120, sku:"GN-FS-201" },
  { id:"fs-02", name:"Sunflower Giant Mix", category:"Flower Seeds", price:119, oldPrice:0, rating:4.6, reviews:87, image:"images/Sunflower Giant Mix.jpg", badge:"", desc:"Towering, cheerful sunflowers that attract pollinators and birds alike.", stock:58, sku:"GN-FS-202" },
  { id:"fs-03", name:"Petunia Cascade Seeds", category:"Flower Seeds", price:109, oldPrice:149, rating:4.5, reviews:74, image:"images/Petunia Cascade Seeds.jpg", badge:"sale", desc:"Trailing petunias ideal for hanging baskets and balcony rails, blooming in vivid colour waves.", stock:47, sku:"GN-FS-203" },
  { id:"pl-01", name:"Money Plant (Golden Pothos)", category:"Plants", price:249, oldPrice:0, rating:4.9, reviews:311, image:"images/Money Plant.jpg", badge:"best", desc:"An easy-care, air-purifying indoor plant that thrives in low light and brings good fortune, they say.", stock:26, sku:"GN-PL-301" },
  { id:"pl-02", name:"Snake Plant (Sansevieria)", category:"Plants", price:299, oldPrice:349, rating:4.7, reviews:168, image:"images/Snake Plant.jpg", badge:"sale", desc:"An architectural, nearly indestructible plant that filters indoor air and needs minimal watering.", stock:31, sku:"GN-PL-302" },
  { id:"pl-03", name:"Aloe Vera Plant", category:"Plants", price:179, oldPrice:0, rating:4.6, reviews:142, image:"images/Aloe Vera Plant.jpg", badge:"new", desc:"A hardy succulent with soothing gel-filled leaves, perfect for kitchen windowsills.", stock:53, sku:"GN-PL-303" },
  { id:"pl-04", name:"Jasmine Climber Plant", category:"Plants", price:329, oldPrice:399, rating:4.8, reviews:96, image:"images/Jasmine Climber.jpg", badge:"", desc:"Fragrant night-blooming jasmine that climbs beautifully over trellises and balconies.", stock:22, sku:"GN-PL-304" },
  { id:"gb-01", name:"Grow Bag — 12 inch (Set of 5)", category:"Grow Bags", price:399, oldPrice:499, rating:4.5, reviews:210, image:"images/Grow Bag 12 inch.jpg", badge:"best", desc:"UV-treated, breathable fabric grow bags with sturdy handles. Great drainage for healthier roots.", stock:75, sku:"GN-GB-401" },
  { id:"gb-02", name:"Grow Bag — 18 inch (Set of 3)", category:"Grow Bags", price:459, oldPrice:0, rating:4.4, reviews:88, image:"images/Grow Bag 18 inch.jpg", badge:"", desc:"Extra-deep grow bags suited for tomatoes, peppers and root vegetables.", stock:40, sku:"GN-GB-402" },
  { id:"gb-03", name:"Hanging Grow Bag — Balcony Pack", category:"Grow Bags", price:349, oldPrice:429, rating:4.3, reviews:56, image:"images/Hanging Grow Bag.jpg", badge:"sale", desc:"Space-saving hanging grow bags designed for small balconies and vertical gardens.", stock:38, sku:"GN-GB-403" },
  { id:"sf-01", name:"Organic Vermicompost — 5kg", category:"Soil & Fertilizers", price:229, oldPrice:0, rating:4.7, reviews:184, image:"images/Vermicompost.jpg", badge:"best", desc:"Nutrient-rich, 100% organic vermicompost that improves soil structure and boosts plant growth.", stock:96, sku:"GN-SF-501" },
  { id:"sf-02", name:"Potting Mix — All Purpose 10L", category:"Soil & Fertilizers", price:189, oldPrice:239, rating:4.5, reviews:132, image:"images/Potting Mix.jpg", badge:"sale", desc:"A well-balanced, lightweight potting mix suited for containers, grow bags and raised beds.", stock:70, sku:"GN-SF-502" },
  { id:"sf-03", name:"Neem Cake Fertilizer — 1kg", category:"Soil & Fertilizers", price:99, oldPrice:0, rating:4.4, reviews:61, image:"images/Neem Cake Fertilizer.jpg", badge:"new", desc:"A natural fertilizer and pest deterrent, slow-releasing nutrients for stronger roots.", stock:110, sku:"GN-SF-503" },
  { id:"gt-01", name:"Hand Trowel & Cultivator Set", category:"Gardening Tools", price:249, oldPrice:299, rating:4.6, reviews:97, image:"images/Trowel & Cultivator.jpg", badge:"sale", desc:"Ergonomic, rust-resistant hand tools built for daily digging, weeding and transplanting.", stock:65, sku:"GN-GT-601" },
  { id:"gt-02", name:"Pruning Shears — Pro Grade", category:"Gardening Tools", price:329, oldPrice:0, rating:4.8, reviews:154, image:"images/Pruning Shears.jpg", badge:"best", desc:"Sharp, precision bypass pruners for clean cuts on stems, branches and flowers.", stock:44, sku:"GN-GT-602" },
  { id:"gt-03", name:"Watering Can — 2L Copper Finish", category:"Gardening Tools", price:279, oldPrice:329, rating:4.5, reviews:73, image:"images/Watering Can.jpg", badge:"", desc:"A stylish, gentle-flow watering can that's kind to seedlings and easy on the eyes.", stock:52, sku:"GN-GT-603" },
  { id:"gt-04", name:"Garden Gloves — Breathable Pair", category:"Gardening Tools", price:79, oldPrice:0, rating:4.2, reviews:38, image:"images/Garden Gloves.jpg", badge:"new", desc:"Comfortable, breathable gloves with reinforced fingertips for everyday garden work.", stock:130, sku:"GN-GT-604" }
];

const CATEGORY_ICONS = {
  "Vegetable Seeds": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21c-4-1-7-4-7-9 0-3 2-6 7-9 5 3 7 6 7 9 0 5-3 8-7 9Z"/></svg>`,
  "Flower Seeds": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2.6"/><path d="M12 3c1.8 0 3 1.6 3 3.4S12 9.4 12 9.4 9 8.2 9 6.4 10.2 3 12 3Zm0 18c1.8 0 3-1.6 3-3.4S12 14.6 12 14.6 9 15.8 9 17.6 10.2 21 12 21ZM3 12c0-1.8 1.6-3 3.4-3S9.4 12 9.4 12 8.2 15 6.4 15 3 13.8 3 12Zm18 0c0-1.8-1.6-3-3.4-3S14.6 12 14.6 12 15.8 15 17.6 15 21 13.8 21 12Z"/></svg>`,
  "Plants": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21V9"/><path d="M12 12C12 7 8 5 4 5c0 5 2 9 8 9Z"/><path d="M12 9c0-4 4-6 8-6 0 5-2 8-8 9Z"/></svg>`,
  "Grow Bags": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
  "Soil & Fertilizers": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 16c3-2 4 2 7 0s4-3 7-1 4 1 4 1"/><path d="M3 20c3-2 4 2 7 0s4-3 7-1 4 1 4 1"/><path d="M12 12V3"/><path d="M9 6l3-3 3 3"/></svg>`,
  "Gardening Tools": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 7 20 13"/><path d="M4 20l7-7"/><path d="M13 4c1.5 1.5 1.5 4 0 5.5S9 11 7.5 9.5 6 5.5 7.5 4 11.5 2.5 13 4Z"/></svg>`
};

const CATEGORY_BLURB = {
  "Vegetable Seeds":"Home-grown, chemical-free harvests",
  "Flower Seeds":"Colour and pollinators for every plot",
  "Plants":"Ready-to-grow indoor & outdoor greens",
  "Grow Bags":"Smart containers for small spaces",
  "Soil & Fertilizers":"Feed your soil, feed your plants",
  "Gardening Tools":"Built for daily garden work"
};

const TIPS = [
  { cat:"Beginner Guide", title:"5 Vegetables That Are Nearly Impossible to Kill", excerpt:"Start your growing journey with these forgiving, high-yield vegetables that thrive even with a little neglect.", image:"images/impossible.jpg" },
  { cat:"Soil Care", title:"How to Read Your Soil Before You Plant", excerpt:"A simple at-home test to check drainage, texture and pH before your next planting season.", image:"images/plants important.jpg" },
  { cat:"Balcony Gardens", title:"Growing a Full Salad Garden in Grow Bags", excerpt:"No backyard? No problem. Here's how to plan a productive salad garden on a small balcony.", image:"images/Salad-greens-station.jpg" }
];

const REVIEWS = [
  { name:"Ananya R.", role:"Balcony Gardener", quote:"My grow bags arrived so well packed and the tomato seeds sprouted within a week. GreenNest has become my go-to shop.", avatar:"images/1l.jpg", rating:5 },
  { name:"Marcus D.", role:"Weekend Grower", quote:"The vermicompost genuinely made a difference — my pepper plants have never looked this healthy.", avatar:"images/2l.jpg", rating:5 },
  { name:"Priya K.", role:"First-time Plant Parent", quote:"Loved the tips section as much as the products. Ordering was simple and delivery was quick.", avatar:"images/3l.jpg", rating:4 }
];

/* ---------- Storage keys ---------- */
const CART_KEY = "greennest_cart";
const WISHLIST_KEY = "greennest_wishlist";

/* ---------- Storage helpers ---------- */
function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateHeaderCounts(); }
function getWishlist(){
  try{ return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }catch(e){ return []; }
}
function saveWishlist(list){ localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); updateHeaderCounts(); }

function findProduct(id){ return PRODUCTS.find(p => p.id === id); }

/* ---------- Cart operations ---------- */
function addToCart(id, qty){
  qty = qty || 1;
  const cart = getCart();
  const line = cart.find(i => i.id === id);
  if(line){ line.qty += qty; }
  else{ cart.push({ id, qty }); }
  saveCart(cart);
  const p = findProduct(id);
  showToast(`${p ? p.name : "Item"} added to cart`, "cart");
}
function removeFromCart(id){
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCartPage();
  showToast("Item removed from cart", "info");
}
function setCartQty(id, qty){
  const cart = getCart();
  const line = cart.find(i => i.id === id);
  if(!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
  renderCartPage();
}
function cartCount(){ return getCart().reduce((sum,i) => sum + i.qty, 0); }
function cartSubtotal(){
  return getCart().reduce((sum,i) => {
    const p = findProduct(i.id);
    return p ? sum + p.price * i.qty : sum;
  },0);
}

/* ---------- Wishlist operations ---------- */
function toggleWishlist(id){
  let list = getWishlist();
  const p = findProduct(id);
  if(list.includes(id)){
    list = list.filter(w => w !== id);
    showToast(`${p ? p.name : "Item"} removed from wishlist`, "info");
  } else {
    list.push(id);
    showToast(`${p ? p.name : "Item"} added to wishlist`, "wishlist");
  }
  saveWishlist(list);
  document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(btn=>{
    btn.classList.toggle("active", list.includes(id));
  });
}
function isWishlisted(id){ return getWishlist().includes(id); }

/* ---------- Toast ---------- */
function showToast(message, type){
  let wrap = document.querySelector(".toast-wrap");
  if(!wrap){
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " error" : "");
  const icon = type === "cart"
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>`
    : type === "wishlist"
    ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.4-9.5-8.7C.7 8.8 2.4 5 6 5c2 0 3.4 1 4 2.3C10.6 6 12 5 14 5c3.6 0 5.3 3.8 3.5 7.3C19 16.6 12 21 12 21Z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>`;
  toast.innerHTML = `${icon}<span>${message}</span>`;
  wrap.appendChild(toast);
  setTimeout(()=>{
    toast.classList.add("hide");
    setTimeout(()=> toast.remove(), 250);
  }, 2600);
}

/* ---------- Star rating markup ---------- */
function starMarkup(rating){
  const full = Math.round(rating);
  let s = "";
  for(let i=1;i<=5;i++){ s += i <= full ? "★" : "☆"; }
  return s;
}

/* ---------- Product card ---------- */
function productCardHTML(p){
  const off = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;
  const wished = isWishlisted(p.id);
  let tagHTML = "";
  if(p.badge === "sale") tagHTML = `<span class="tag sale">Sale</span>`;
  else if(p.badge === "best") tagHTML = `<span class="tag best">Bestseller</span>`;
  else if(p.badge === "new") tagHTML = `<span class="tag new">New</span>`;
  return `
  <article class="product-card" data-id="${p.id}">
    <div class="product-media">
      <a href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-tags">${tagHTML}</div>
      <button class="wishlist-btn ${wished ? "active" : ""}" data-id="${p.id}" aria-label="Toggle wishlist for ${p.name}">
        <svg viewBox="0 0 24 24" fill="${wished ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.4-9.5-8.7C.7 8.8 2.4 5 6 5c2 0 3.4 1 4 2.3C10.6 6 12 5 14 5c3.6 0 5.3 3.8 3.5 7.3C19 16.6 12 21 12 21Z"/></svg>
      </button>
    </div>
    <div class="product-body">
      <span class="product-cat">${p.category}</span>
      <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-rating"><span class="stars">${starMarkup(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviews})</div>
      <div class="product-price">
        <span class="price-now">₹${p.price}</span>
        ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice}</span><span class="price-off">${off}% OFF</span>` : ""}
      </div>
      <div class="product-actions">
        <button class="add-cart-btn" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  </article>`;
}

function renderProductGrid(container, products){
  if(!container) return;
  if(products.length === 0){
    container.innerHTML = `<div class="no-results"><h3>No products found</h3><p>Try adjusting your search or filters.</p></div>`;
    return;
  }
  container.innerHTML = products.map(productCardHTML).join("");
}

/* ---------- Delegated events for product cards (works on any page) ---------- */
document.addEventListener("click", function(e){
  const addBtn = e.target.closest(".add-cart-btn");
  if(addBtn){
    const id = addBtn.dataset.id;
    addToCart(id, 1);
    addBtn.classList.add("added");
    const original = addBtn.innerHTML;
    addBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> Added`;
    setTimeout(()=>{ addBtn.classList.remove("added"); addBtn.innerHTML = original; }, 1400);
    return;
  }
  const wishBtn = e.target.closest(".wishlist-btn");
  if(wishBtn){
    toggleWishlist(wishBtn.dataset.id);
    return;
  }
});

/* ---------- Header counts ---------- */
function updateHeaderCounts(){
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartCount());
  document.querySelectorAll(".wishlist-count").forEach(el => el.textContent = getWishlist().length);
}

/* ---------- Mobile menu ---------- */
function initMobileMenu(){
  const toggle = document.querySelector(".menu-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const closeBtn = document.querySelector(".drawer-close");
  if(!toggle || !drawer) return;
  const open = () => { drawer.classList.add("open"); toggle.classList.add("open"); document.body.style.overflow="hidden"; };
  const close = () => { drawer.classList.remove("open"); toggle.classList.remove("open"); document.body.style.overflow=""; };
  toggle.addEventListener("click", () => {
    drawer.classList.contains("open") ? close() : open();
  });
  if(closeBtn) closeBtn.addEventListener("click", close);
  drawer.addEventListener("click", (e) => { if(e.target === drawer) close(); });
}

/* ---------- Header search ---------- */
function initHeaderSearch(){
  document.querySelectorAll("[data-search-form]").forEach(form=>{
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const input = form.querySelector("input");
      const q = input.value.trim();
      window.location.href = "products.html" + (q ? `?search=${encodeURIComponent(q)}` : "");
    });
  });
}

/* ---------- Newsletter form (any page) ---------- */
function initNewsletterForm(){
  document.querySelectorAll(".newsletter-form").forEach(form=>{
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const input = form.querySelector("input");
      if(input && input.value.trim()){
        showToast("Thanks for subscribing to GreenNest!", "info");
        form.reset();
      } else {
        showToast("Please enter a valid email address", "error");
      }
    });
  });
}

/* ---------- Contact form ---------- */
function initContactForm(){
  const form = document.querySelector(".contact-form");
  if(!form) return;
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    showToast("Message sent! We'll get back to you within 24 hours.", "info");
    form.reset();
  });
}

/* ---------- Homepage renderers ---------- */
function renderCategoryGrid(){
  const grid = document.querySelector("[data-category-grid]");
  if(!grid) return;
  const cats = Object.keys(CATEGORY_ICONS);
  grid.innerHTML = cats.map(cat => `
    <a class="cat-card" href="products.html?category=${encodeURIComponent(cat)}">
      <div class="cat-blob">${CATEGORY_ICONS[cat]}</div>
      <h3>${cat}</h3>
      <span>${CATEGORY_BLURB[cat]}</span>
    </a>
  `).join("");
}
function renderFeatured(){
  const el = document.querySelector("[data-featured-products]");
  if(!el) return;
  const featured = PRODUCTS.filter(p => p.badge === "new" || p.badge === "sale").slice(0,4);
  renderProductGrid(el, featured.length ? featured : PRODUCTS.slice(0,4));
}
function renderBestSellers(){
  const el = document.querySelector("[data-bestseller-products]");
  if(!el) return;
  const list = PRODUCTS.filter(p => p.badge === "best").slice(0,4);
  renderProductGrid(el, list);
}
function renderTips(){
  const el = document.querySelector("[data-tips]");
  if(!el) return;
  el.innerHTML = TIPS.map(t => `
    <article class="tip-card">
      <div class="tip-media"><img src="${t.image}" alt="${t.title}" loading="lazy"></div>
      <div class="tip-body">
        <span class="tip-cat">${t.cat}</span>
        <h3>${t.title}</h3>
        <p>${t.excerpt}</p>
        <a href="#" class="tip-read" onclick="return false;">Read the guide →</a>
      </div>
    </article>
  `).join("");
}
function renderReviews(){
  const el = document.querySelector("[data-reviews]");
  if(!el) return;
  el.innerHTML = REVIEWS.map(r => `
    <article class="review-card">
      <div class="review-stars">${starMarkup(r.rating)}</div>
      <p class="review-quote">“${r.quote}”</p>
      <div class="review-person">
        <img class="review-avatar" src="${r.avatar}" alt="${r.name}">
        <div><strong>${r.name}</strong><span>${r.role}</span></div>
      </div>
    </article>
  `).join("");
}

/* ---------- Products (shop) page ---------- */
function initShopPage(){
  const grid = document.querySelector("[data-shop-grid]");
  if(!grid) return;

  const params = new URLSearchParams(window.location.search);
  const wishlistOnly = params.get("wishlist") === "1";
  const state = {
    search: params.get("search") || "",
    categories: params.get("category") ? [params.get("category")] : [],
    maxPrice: 500,
    sort: "featured"
  };

  const heading = document.querySelector(".page-hero h1");
  if(wishlistOnly && heading) heading.textContent = "Your Wishlist";

  const searchInput = document.querySelector("[data-shop-search]");
  const checkboxes = document.querySelectorAll("[data-cat-filter]");
  const priceRange = document.querySelector("[data-price-range]");
  const priceLabel = document.querySelector("[data-price-label]");
  const sortSelect = document.querySelector("[data-sort-select]");
  const resultCount = document.querySelector("[data-result-count]");
  const clearBtn = document.querySelector("[data-clear-filters]");

  if(searchInput) searchInput.value = state.search;
  checkboxes.forEach(cb => { if(state.categories.includes(cb.value)) cb.checked = true; });

  function apply(){
    let list = PRODUCTS.slice();

    if(wishlistOnly){
      const wl = getWishlist();
      list = list.filter(p => wl.includes(p.id));
    }
    if(state.search){
      const q = state.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if(state.categories.length){
      list = list.filter(p => state.categories.includes(p.category));
    }
    list = list.filter(p => p.price <= state.maxPrice);

    switch(state.sort){
      case "price-low": list.sort((a,b)=> a.price - b.price); break;
      case "price-high": list.sort((a,b)=> b.price - a.price); break;
      case "rating": list.sort((a,b)=> b.rating - a.rating); break;
      case "name": list.sort((a,b)=> a.name.localeCompare(b.name)); break;
      default: break; // featured = catalog order
    }

    renderProductGrid(grid, list);
    if(resultCount) resultCount.textContent = `${list.length} product${list.length !== 1 ? "s" : ""} found`;
  }

  if(searchInput){
    searchInput.addEventListener("input", () => { state.search = searchInput.value.trim(); apply(); });
  }
  checkboxes.forEach(cb=>{
    cb.addEventListener("change", () => {
      state.categories = Array.from(checkboxes).filter(c=>c.checked).map(c=>c.value);
      apply();
    });
  });
  if(priceRange){
    priceRange.addEventListener("input", () => {
      state.maxPrice = Number(priceRange.value);
      if(priceLabel) priceLabel.textContent = `₹0 – ₹${state.maxPrice}`;
      apply();
    });
  }
  if(sortSelect){
    sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; apply(); });
  }
  if(clearBtn){
    clearBtn.addEventListener("click", () => {
      state.search = ""; state.categories = []; state.maxPrice = 500; state.sort = "featured";
      if(searchInput) searchInput.value = "";
      checkboxes.forEach(cb => cb.checked = false);
      if(priceRange){ priceRange.value = 500; }
      if(priceLabel) priceLabel.textContent = "₹0 – ₹500";
      if(sortSelect) sortSelect.value = "featured";
      apply();
    });
  }

  apply();
}

/* ---------- Product detail page ---------- */
function initProductPage(){
  const wrap = document.querySelector("[data-pd-wrap]");
  if(!wrap) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  const p = findProduct(id) || PRODUCTS[0];

  document.title = `${p.name} — GreenNest`;

  const off = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;
  const wished = isWishlisted(p.id);

  wrap.innerHTML = `
    <div class="pd-gallery">
      <div class="pd-gallery-main"><img src="${p.image}" alt="${p.name}" id="pd-main-img"></div>
      <div class="pd-thumbs">
        <button class="active" data-img="${p.image}"><img src="${p.image}" alt="${p.name} thumbnail 1"></button>
        <button data-img="${p.image}?grayscale"><img src="${p.image}?grayscale" alt="${p.name} thumbnail 2"></button>
        <button data-img="${p.image}?blur=2"><img src="${p.image}?blur=2" alt="${p.name} thumbnail 3"></button>
      </div>
    </div>
    <div class="pd-info">
      <span class="product-cat">${p.category}</span>
      <h1>${p.name}</h1>
      <div class="product-rating"><span class="stars">${starMarkup(p.rating)}</span> ${p.rating.toFixed(1)} · ${p.reviews} reviews · SKU ${p.sku}</div>
      <div class="pd-price">
        <span class="price-now">₹${p.price}</span>
        ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice}</span><span class="price-off">${off}% OFF</span>` : ""}
      </div>
      <p class="pd-desc">${p.desc}</p>
      <ul class="pd-meta">
        <li><span>Availability</span><strong>${p.stock > 0 ? `In stock (${p.stock} left)` : "Out of stock"}</strong></li>
        <li><span>Category</span><strong>${p.category}</strong></li>
        <li><span>Delivery</span><strong>2–5 business days</strong></li>
      </ul>
      <div class="qty-control" data-pd-qty>
        <button type="button" data-qty-down aria-label="Decrease quantity">−</button>
        <input type="number" value="1" min="1" max="${p.stock}" data-qty-input>
        <button type="button" data-qty-up aria-label="Increase quantity">+</button>
      </div>
      <div class="pd-actions">
        <button class="btn btn-primary" data-pd-add-cart>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>
          Add to Cart
        </button>
        <button class="btn btn-secondary wishlist-btn ${wished ? "active" : ""}" data-id="${p.id}" style="position:static; width:auto; border-radius:999px; padding:14px 22px;">
          <svg viewBox="0 0 24 24" fill="${wished ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 21s-7-4.4-9.5-8.7C.7 8.8 2.4 5 6 5c2 0 3.4 1 4 2.3C10.6 6 12 5 14 5c3.6 0 5.3 3.8 3.5 7.3C19 16.6 12 21 12 21Z"/></svg>
          Wishlist
        </button>
      </div>
      <div class="pd-trust">
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7 12 3 4 7v6c0 5 4 8 8 8s8-3 8-8V7Z"/><path d="m9 12 2 2 4-4"/></svg> Quality guaranteed</div>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="16" height="12" rx="2"/><path d="M17 10h3l3 3v3h-6z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17.5" cy="19" r="1.6"/></svg> Fast dispatch</div>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/><path d="M12 7v5l3 3"/></svg> Easy 7-day returns</div>
      </div>
    </div>
  `;

  // thumbnails
  wrap.querySelectorAll(".pd-thumbs button").forEach(btn=>{
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".pd-thumbs button").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("pd-main-img").src = btn.dataset.img;
    });
  });

  // qty controls
  const qtyInput = wrap.querySelector("[data-qty-input]");
  wrap.querySelector("[data-qty-up]").addEventListener("click", () => {
    qtyInput.value = Math.min(p.stock, Number(qtyInput.value) + 1);
  });
  wrap.querySelector("[data-qty-down]").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });

  // add to cart
  wrap.querySelector("[data-pd-add-cart]").addEventListener("click", () => {
    addToCart(p.id, Math.max(1, Number(qtyInput.value) || 1));
  });

  // tabs
  const tabHeaders = document.querySelectorAll(".tab-headers button");
  tabHeaders.forEach(btn=>{
    btn.addEventListener("click", () => {
      tabHeaders.forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // related products
  const related = PRODUCTS.filter(rp => rp.category === p.category && rp.id !== p.id).slice(0,4);
  const relatedGrid = document.querySelector("[data-related-grid]");
  if(relatedGrid) renderProductGrid(relatedGrid, related.length ? related : PRODUCTS.filter(x=>x.id!==p.id).slice(0,4));
}

/* ---------- Cart page ---------- */
function renderCartPage(){
  const listEl = document.querySelector("[data-cart-list]");
  if(!listEl) return;
  const cart = getCart();
  const emptyEl = document.querySelector("[data-cart-empty]");
  const layoutEl = document.querySelector("[data-cart-layout]");

  if(cart.length === 0){
    if(layoutEl) layoutEl.classList.add("hidden");
    if(emptyEl) emptyEl.classList.remove("hidden");
    return;
  }
  if(layoutEl) layoutEl.classList.remove("hidden");
  if(emptyEl) emptyEl.classList.add("hidden");

  listEl.innerHTML = cart.map(item => {
    const p = findProduct(item.id);
    if(!p) return "";
    return `
    <div class="cart-row" data-id="${p.id}">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <div class="cart-item-name"><a href="product.html?id=${p.id}">${p.name}</a></div>
        <div class="cart-item-cat">${p.category}</div>
      </div>
      <div class="qty-control" data-cart-qty>
        <button type="button" data-cart-qty-down aria-label="Decrease quantity">−</button>
        <input type="number" value="${item.qty}" min="1" data-cart-qty-input>
        <button type="button" data-cart-qty-up aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item-price">₹${p.price * item.qty}</div>
      <button class="cart-remove" data-remove aria-label="Remove ${p.name}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>
      </button>
    </div>`;
  }).join("");

  listEl.querySelectorAll(".cart-row").forEach(row=>{
    const id = row.dataset.id;
    row.querySelector("[data-remove]").addEventListener("click", () => removeFromCart(id));
    const input = row.querySelector("[data-cart-qty-input]");
    row.querySelector("[data-cart-qty-up]").addEventListener("click", () => {
      setCartQty(id, Number(input.value) + 1);
    });
    row.querySelector("[data-cart-qty-down]").addEventListener("click", () => {
      setCartQty(id, Number(input.value) - 1);
    });
    input.addEventListener("change", () => setCartQty(id, Number(input.value) || 1));
  });

  const subtotal = cartSubtotal();
  const shipping = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + shipping;

  const subtotalEl = document.querySelector("[data-cart-subtotal]");
  const shippingEl = document.querySelector("[data-cart-shipping]");
  const totalEl = document.querySelector("[data-cart-total]");
  if(subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if(shippingEl) shippingEl.textContent = shipping === 0 ? "Free" : `₹${shipping}`;
  if(totalEl) totalEl.textContent = `₹${total}`;
}

function initCartPage(){
  if(!document.querySelector("[data-cart-list]")) return;
  renderCartPage();
  const promoForm = document.querySelector("[data-promo-form]");
  if(promoForm){
    promoForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      const input = promoForm.querySelector("input");
      if(input.value.trim().toUpperCase() === "GREEN10"){
        showToast("Promo code applied! 10% off will reflect at checkout.", "info");
      } else {
        showToast("Invalid promo code", "error");
      }
    });
  }
  const checkoutBtn = document.querySelector("[data-checkout-btn]");
  if(checkoutBtn){
    checkoutBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      if(getCart().length === 0){
        showToast("Your cart is empty", "error");
        return;
      }
      showToast("This is a demo store — checkout isn't connected yet.", "info");
    });
  }
}

/* ---------- Init on load ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderCounts();
  initMobileMenu();
  initHeaderSearch();
  initNewsletterForm();
  initContactForm();

  renderCategoryGrid();
  renderFeatured();
  renderBestSellers();
  renderTips();
  renderReviews();

  initShopPage();
  initProductPage();
  initCartPage();
});
