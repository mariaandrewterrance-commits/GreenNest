# GreenNest — Grow Naturally. Live Better.

A fully static, responsive gardening e-commerce website built with plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no backend.

## Files

```
GreenNest/
├── index.html      Homepage
├── products.html   Shop / product listing with search, filters, sorting
├── product.html    Product details page (reads ?id=<product-id>)
├── cart.html        Cart with quantity controls and totals
├── about.html       Brand story, values, team
├── contact.html      Contact form + info
├── style.css         All styling (design tokens + components + responsive)
├── script.js          Product data, cart/wishlist logic, all interactivity
└── images/            (placeholder images are loaded from picsum.photos — see below)
```

## Run it locally

Just double-click `index.html` — it opens directly in your browser, no server required. All product data lives in `script.js` and cart/wishlist state is saved in `localStorage`, so it works fully offline once images are cached (images themselves are pulled from the web).

## Deploy to Netlify

1. Drag and drop the whole `GreenNest` folder onto [Netlify Drop](https://app.netlify.com/drop), **or**
2. Zip the folder and upload it in the Netlify dashboard ("Deploy manually"), **or**
3. Push this folder to a Git repo and connect it in Netlify (build command: none, publish directory: `/`).

No environment variables, no build step.

## Customizing

- **Products**: edit the `PRODUCTS` array at the top of `script.js`. Each product needs `id`, `name`, `category`, `price`, `oldPrice`, `rating`, `reviews`, `image`, `badge` (`"best"`, `"sale"`, `"new"` or `""`), `desc`, `stock`, `sku`.
- **Categories**: update `CATEGORY_ICONS` and `CATEGORY_BLURB` in `script.js`, and the category checkboxes in `products.html`.
- **Colors/fonts**: all design tokens are CSS custom properties at the top of `style.css` (`:root`).
- **Images**: this build uses [picsum.photos](https://picsum.photos) seeded placeholder images so every product/photo slot renders reliably out of the box. Swap any `src="https://picsum.photos/..."` for your own photos (e.g. files placed in `/images`) whenever you're ready.

## Features implemented

- Sticky header with search, wishlist and cart counters
- Mobile slide-in menu
- Shop by Category, Featured Products, Best Sellers, Offers, Tips, Reviews, Newsletter
- Product cards: image, rating, price + original price + discount %, wishlist toggle, add to cart
- Cart: add/remove, quantity controls, live subtotal/shipping/total, promo code (`GREEN10`)
- Wishlist: toggle from any product card, persisted in `localStorage`
- Product search, category filters, price filter, sorting on the shop page
- Product details page with gallery thumbnails, quantity stepper, tabs, related products
- Toast notifications for cart/wishlist/newsletter/contact actions
- Fully responsive: desktop, tablet, mobile
