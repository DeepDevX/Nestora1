/* Nestora prototype - shared logic: product data, cart, header/footer, page behaviour.
   No backend: the cart is stored in the browser (localStorage). No real payments. */

const PRODUCTS = [
  { id: "wall-desk", name: "Fold-Away Wall Desk", cat: "Desks", price: 189, rent: 19, w: 80, d: 12, h: 60, art: "desk", bg: "#E6EFE9", c: "#2F6B4F",
    short: "A wall-mounted desk that folds flat when you are done working.",
    long: "Turns any bare wall into a workspace. Fold it down for a 80 cm wide desk, fold it up and it sticks out only 12 cm. Mounts with the included hardware and comes off cleanly when you move out.",
    features: ["Folds flat to 12 cm deep", "Holds up to 30 kg", "Renter-friendly mounting kit", "FSC-certified birch plywood"] },
  { id: "nest-stools", name: "Nest Stackable Stools (Set of 2)", cat: "Seating", price: 79, rent: null, w: 34, d: 34, h: 45, art: "stool", bg: "#FBEFDC", c: "#D9822B",
    short: "Two stools that nest into one. Seat for guests, then tuck them away.",
    long: "Light enough to carry with one hand and sturdy enough to sit on every day. The two stools nest together so they take up the floor space of one.",
    features: ["Nest together to save space", "Wipe-clean seat", "Supports 120 kg each", "Ships fully assembled"] },
  { id: "slim-shelf", name: "Slim Rolling Bookcase", cat: "Storage", price: 149, rent: 12, w: 40, d: 30, h: 150, art: "shelf", bg: "#E8EEF3", c: "#3C6E8F",
    short: "A tall, narrow bookcase on wheels that slides into gaps other shelves cannot.",
    long: "Only 40 cm wide, this rolling bookcase fits beside a fridge, between a desk and a wall, or in a hallway. Locking wheels keep it put, and it rolls out when you need to clean.",
    features: ["Only 40 cm wide", "Locking wheels", "5 adjustable shelves", "Tool-free assembly in 15 minutes"] },
  { id: "sofa-bed", name: "Compact Loveseat Sofa Bed", cat: "Seating", price: 599, rent: 49, w: 150, d: 85, h: 80, art: "sofa", bg: "#F3E8E4", c: "#8B5A4A",
    short: "A two-seat sofa that opens into a full bed. Fits through a standard elevator.",
    long: "Built in sections so it fits through narrow doors and into small elevators. It is a comfortable sofa by day and a double bed for guests at night. Covers are removable and machine washable.",
    features: ["Fits 80 cm doorways", "Opens to a double bed", "Removable washable covers", "Rental plan available"] },
  { id: "leaf-table", name: "Drop-Leaf Dining Table", cat: "Tables", price: 249, rent: 24, w: 100, d: 40, h: 75, art: "table", bg: "#F6EFD9", c: "#9A7B2F",
    short: "Seats two against the wall, four with the leaves up.",
    long: "Keep it slim at 40 cm deep for everyday use. Lift both leaves and it opens to 100 x 90 cm to seat four. Rounded corners are kinder to tight spaces.",
    features: ["40 cm deep when folded", "Seats 2 to 4", "Water-resistant finish", "Solid rubberwood legs"] },
  { id: "under-bed", name: "Under-Bed Storage Drawers", cat: "Storage", price: 99, rent: null, w: 100, d: 55, h: 18, art: "drawers", bg: "#EAE6F2", c: "#6B5B95",
    short: "Two rolling drawers that use the space under your bed.",
    long: "Slide-out drawers with soft-glide wheels use space you already have. Each drawer holds about 60 litres of bedding, shoes or off-season clothes.",
    features: ["Low 18 cm profile", "Soft-glide wheels", "Dust-cover lids", "Stackable for moving"] },
  { id: "flat-chair", name: "Flat-Pack Desk Chair", cat: "Seating", price: 129, rent: 14, w: 48, d: 50, h: 85, art: "chair", bg: "#E4EEEE", c: "#2E7D7A",
    short: "A comfortable desk chair that assembles in 10 minutes and takes apart again.",
    long: "Designed for people who move often. It goes together with four bolts and no glue, so you can take it apart and flat-pack it as many times as you need.",
    features: ["Rebuild 20+ times", "Curved supportive back", "Four-bolt assembly", "5-year warranty"] },
  { id: "cube-shelf", name: "Modular Cube Shelf", cat: "Storage", price: 119, rent: 11, w: 105, d: 32, h: 70, art: "cube", bg: "#F1E9F0", c: "#A0527F",
    short: "Six cubes you can stack, split or spread across rooms.",
    long: "Use it as a room divider, a TV stand or two separate side tables. Cubes lock together with hidden connectors and can be rearranged any time.",
    features: ["Reconfigurable layouts", "Fits standard storage bins", "Anti-tip wall strap", "Rental plan available"] },
];

const money = (n) => "$" + n.toFixed(2);
const byId = (id) => PRODUCTS.find((p) => p.id === id);

/* ---------- Product illustrations (original SVG, no external images) ---------- */
function art(p) {
  const c = p.c, bg = p.bg;
  const dark = "#27332d";
  let g = "";
  const shadow = (cx, rx) => `<ellipse cx="${cx}" cy="248" rx="${rx}" ry="9" fill="#000" opacity=".10"/>`;
  switch (p.art) {
    case "desk":
      g = `<rect x="95" y="55" width="210" height="95" rx="6" fill="#fff" opacity=".7" stroke="${c}" stroke-width="2" stroke-dasharray="5 5"/>
           <polygon points="75,150 325,150 325,164 75,164" fill="${c}"/>
           <polygon points="110,164 150,164 110,205" fill="${dark}" opacity=".85"/>
           <polygon points="290,164 250,164 290,205" fill="${dark}" opacity=".85"/>
           <rect x="170" y="118" width="80" height="32" rx="3" fill="${dark}"/><rect x="176" y="123" width="68" height="22" rx="2" fill="#9ec3b2"/>
           <rect x="272" y="128" width="22" height="22" rx="4" fill="#C77B4A"/><path d="M283 128c-10-18 2-26 0-34 12 8 14 24 0 34z" fill="#4f9a6a"/>
           <rect x="125" y="140" width="26" height="10" rx="2" fill="#e8b04a"/>`;
      break;
    case "stool":
      g = shadow(200, 130) + `
        <g><ellipse cx="140" cy="160" rx="48" ry="13" fill="${c}"/><rect x="92" y="160" width="96" height="10" fill="${c}" opacity=".8"/>
        <line x1="108" y1="170" x2="96" y2="245" stroke="${dark}" stroke-width="8" stroke-linecap="round"/>
        <line x1="172" y1="170" x2="184" y2="245" stroke="${dark}" stroke-width="8" stroke-linecap="round"/></g>
        <g><ellipse cx="268" cy="190" rx="44" ry="12" fill="${c}" opacity=".85"/><rect x="224" y="190" width="88" height="9" fill="${c}" opacity=".65"/>
        <line x1="240" y1="199" x2="232" y2="245" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
        <line x1="296" y1="199" x2="304" y2="245" stroke="${dark}" stroke-width="7" stroke-linecap="round"/></g>`;
      break;
    case "shelf":
      g = shadow(200, 70) + `
        <rect x="150" y="40" width="100" height="190" rx="4" fill="#fff" stroke="${c}" stroke-width="5"/>
        <line x1="150" y1="88" x2="250" y2="88" stroke="${c}" stroke-width="4"/><line x1="150" y1="135" x2="250" y2="135" stroke="${c}" stroke-width="4"/><line x1="150" y1="182" x2="250" y2="182" stroke="${c}" stroke-width="4"/>
        <rect x="160" y="52" width="10" height="36" fill="#d9822b"/><rect x="172" y="58" width="12" height="30" fill="${dark}"/><rect x="186" y="50" width="9" height="38" fill="#7aa68f"/><rect x="214" y="66" width="26" height="22" rx="3" fill="#e8b04a"/>
        <rect x="162" y="103" width="30" height="32" rx="3" fill="#c9a98f"/><rect x="200" y="112" width="12" height="23" fill="${c}"/><rect x="214" y="106" width="12" height="29" fill="${dark}"/>
        <rect x="160" y="150" width="36" height="32" rx="3" fill="#9db7c8"/><circle cx="226" cy="168" r="14" fill="#d98b8b"/>
        <rect x="160" y="196" width="80" height="26" rx="3" fill="#ece3d1"/>
        <circle cx="162" cy="238" r="8" fill="${dark}"/><circle cx="238" cy="238" r="8" fill="${dark}"/>`;
      break;
    case "sofa":
      g = shadow(200, 150) + `
        <rect x="95" y="105" width="210" height="78" rx="18" fill="${c}"/>
        <rect x="68" y="148" width="40" height="80" rx="14" fill="${c}" opacity=".9"/><rect x="292" y="148" width="40" height="80" rx="14" fill="${c}" opacity=".9"/>
        <rect x="100" y="165" width="200" height="56" rx="12" fill="${c}" style="filter:brightness(1.12)"/>
        <line x1="200" y1="168" x2="200" y2="218" stroke="#00000030" stroke-width="2"/>
        <rect x="112" y="122" width="52" height="44" rx="10" fill="#f2d9c4" transform="rotate(-8 138 144)"/>
        <rect x="88" y="226" width="12" height="16" rx="3" fill="${dark}"/><rect x="300" y="226" width="12" height="16" rx="3" fill="${dark}"/>`;
      break;
    case "table":
      g = shadow(200, 130) + `
        <rect x="70" y="140" width="22" height="8" fill="${c}" opacity=".7"/><rect x="80" y="148" width="22" height="46" rx="3" fill="${c}" opacity=".7"/>
        <rect x="308" y="148" width="22" height="46" rx="3" fill="${c}" opacity=".7"/>
        <rect x="95" y="136" width="210" height="14" rx="5" fill="${c}"/>
        <rect x="125" y="150" width="11" height="96" rx="3" fill="${dark}"/><rect x="264" y="150" width="11" height="96" rx="3" fill="${dark}"/>
        <ellipse cx="200" cy="130" rx="30" ry="8" fill="#fff"/><path d="M172 128c4 14 52 14 56 0z" fill="#e8b04a"/>
        <rect x="140" y="120" width="12" height="16" fill="#8fbf9c"/>`;
      break;
    case "drawers":
      g = shadow(200, 150) + `
        <rect x="55" y="130" width="290" height="26" rx="8" fill="#fff" stroke="${c}" stroke-width="3"/>
        <rect x="68" y="156" width="9" height="86" rx="3" fill="${dark}"/><rect x="323" y="156" width="9" height="86" rx="3" fill="${dark}"/>
        <rect x="100" y="188" width="200" height="50" rx="7" fill="${c}"/><line x1="200" y1="188" x2="200" y2="238" stroke="#fff" stroke-width="2" opacity=".6"/>
        <rect x="140" y="208" width="24" height="6" rx="3" fill="#fff"/><rect x="236" y="208" width="24" height="6" rx="3" fill="#fff"/>
        <circle cx="116" cy="241" r="5" fill="${dark}"/><circle cx="284" cy="241" r="5" fill="${dark}"/>`;
      break;
    case "chair":
      g = shadow(200, 80) + `
        <rect x="152" y="86" width="96" height="66" rx="12" fill="${c}"/>
        <rect x="140" y="160" width="120" height="16" rx="6" fill="${c}" style="filter:brightness(1.15)"/>
        <rect x="150" y="176" width="9" height="68" rx="3" fill="${dark}"/><rect x="241" y="176" width="9" height="68" rx="3" fill="${dark}"/>
        <rect x="150" y="214" width="100" height="6" rx="3" fill="${dark}" opacity=".8"/>
        <rect x="168" y="100" width="64" height="8" rx="4" fill="#fff" opacity=".5"/>`;
      break;
    case "cube":
      g = shadow(200, 140) + `
        <rect x="90" y="100" width="220" height="140" rx="6" fill="#fff" stroke="${c}" stroke-width="5"/>
        <line x1="163" y1="100" x2="163" y2="240" stroke="${c}" stroke-width="4"/><line x1="237" y1="100" x2="237" y2="240" stroke="${c}" stroke-width="4"/>
        <line x1="90" y1="170" x2="310" y2="170" stroke="${c}" stroke-width="4"/>
        <rect x="104" y="118" width="46" height="46" rx="4" fill="#d9c6a0"/><circle cx="200" cy="140" r="17" fill="#d98b8b"/><rect x="252" y="120" width="44" height="44" rx="4" fill="#9db7c8"/>
        <rect x="104" y="188" width="46" height="46" rx="4" fill="#ece3d1"/><rect x="178" y="190" width="44" height="40" rx="3" fill="${c}" opacity=".8"/><path d="M274 232c-12-30 2-40 0-48 14 10 18 32 0 48z" fill="#4f9a6a"/>`;
      break;
  }
  return `<svg viewBox="0 0 400 300" role="img" aria-label="Illustration of ${p.name}" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="${bg}"/><rect y="245" width="400" height="55" fill="#000" opacity=".05"/>${g}</svg>`;
}

/* ---------- Cart ---------- */
const CART_KEY = "nestora_cart", PROMO_KEY = "nestora_promo";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
const saveCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} refreshBadge(); };
const cartCount = () => getCart().reduce((n, l) => n + l.qty, 0);
function addToCart(id, mode = "buy", qty = 1) {
  const cart = getCart();
  const line = cart.find((l) => l.id === id && l.mode === mode);
  if (line) line.qty = Math.min(line.qty + qty, 10); else cart.push({ id, mode, qty });
  saveCart(cart);
  toast(`Added to cart: ${byId(id).name}`);
}
const unitPrice = (l) => { const p = byId(l.id); return l.mode === "rent" ? p.rent : p.price; };
function refreshBadge() { document.querySelectorAll(".badge").forEach((b) => (b.textContent = cartCount())); }

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Shared header / footer ---------- */
function renderChrome() {
  const page = document.body.dataset.page;
  const nav = [["index.html", "Home", "home"], ["products.html", "Shop", "products"], ["about.html", "About Us", "about"], ["contact.html", "Contact", "contact"]];
  document.getElementById("site-header").innerHTML = `
    <div class="topbar">Free shipping on orders over $99 CAD &nbsp;|&nbsp; Rent or buy &nbsp;|&nbsp; 30-day returns</div>
    <header class="site"><div class="wrap nav">
      <a href="index.html" class="logo" aria-label="Nestora home"><span class="mark">N</span>Nestora</a>
      <ul id="menu">${nav.map(([h, t, k]) => `<li><a href="${h}" class="${page === k || (k === "products" && page === "product") ? "active" : ""}">${t}</a></li>`).join("")}</ul>
      <div style="display:flex;gap:10px;align-items:center">
        <a href="cart.html" class="cart-link" aria-label="Shopping cart">Cart <span class="badge">0</span></a>
        <button class="menu-btn" id="menu-btn" aria-label="Open menu">&#9776;</button>
      </div></div></header>`;
  document.getElementById("site-footer").innerHTML = `
    <footer class="site"><div class="wrap">
      <div class="foot-grid">
        <div><a href="index.html" class="logo"><span class="mark">N</span>Nestora</a><p>Furniture that fits small spaces and moves with you. Buy it or rent it.</p></div>
        <div><h4>SHOP</h4><ul><li><a href="products.html">All products</a></li><li><a href="products.html?cat=Seating">Seating</a></li><li><a href="products.html?cat=Storage">Storage</a></li><li><a href="products.html?cat=Desks">Desks</a></li></ul></div>
        <div><h4>COMPANY</h4><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact</a></li><li><a href="cart.html">Your cart</a></li></ul></div>
        <div><h4>STAY IN THE LOOP</h4><p>Small-space tips and new arrivals, twice a month.</p>
          <form class="news" id="news-form"><input type="email" placeholder="you@email.com" aria-label="Email address" required><button class="btn btn-accent btn-sm">Join</button></form></div>
      </div>
      <div class="foot-bottom"><span>&copy; 2026 Nestora (imaginary company, class prototype). www.nestora.shop</span><span>No real payments are processed on this site.</span></div>
    </div></footer>`;
  document.getElementById("menu-btn").onclick = () => document.getElementById("menu").classList.toggle("open");
  document.getElementById("news-form").onsubmit = (e) => { e.preventDefault(); toast("Thanks for joining (demo only)"); e.target.reset(); };
  refreshBadge();
}

/* ---------- Product card ---------- */
function card(p, fit) {
  const fitFlag = fit === undefined ? "" : fit ? `<span class="fit-flag">Fits your space</span>` : `<span class="fit-flag no">Too large</span>`;
  return `<article class="product-card ${fit === false ? "dim" : ""}">
    <a href="product.html?id=${p.id}" class="art-wrap" aria-label="View ${p.name}"><div class="art">${art(p)}</div>${fitFlag}</a>
    <div class="body">
      <span class="cat">${p.cat}</span>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <span class="dims">${p.w} W x ${p.d} D x ${p.h} H cm</span>
      <div class="price-row"><span class="price">${money(p.price)}</span>${p.rent ? `<span class="rent">or ${money(p.rent)}/mo</span>` : ""}</div>
      <div class="card-actions">
        <a class="btn btn-ghost" href="product.html?id=${p.id}">Details</a>
        <button class="btn btn-primary" data-add="${p.id}">Add to cart</button>
      </div>
    </div></article>`;
}
function wireAddButtons(root = document) {
  root.querySelectorAll("[data-add]").forEach((b) => (b.onclick = () => addToCart(b.dataset.add, "buy", 1)));
}

/* ---------- Pages ---------- */
function initHome() {
  const el = document.getElementById("featured");
  el.innerHTML = PRODUCTS.slice(0, 4).map((p) => card(p)).join("");
  wireAddButtons(el);
}

function initProducts() {
  const grid = document.getElementById("grid"), count = document.getElementById("count");
  const params = new URLSearchParams(location.search);
  let cat = params.get("cat") || "All", sort = "featured", fitW = null, fitD = null;
  const cats = ["All", ...new Set(PRODUCTS.map((p) => p.cat))];
  const chips = document.getElementById("chips");
  function draw() {
    chips.innerHTML = cats.map((c) => `<button class="chip ${c === cat ? "on" : ""}" data-c="${c}">${c}</button>`).join("");
    chips.querySelectorAll(".chip").forEach((b) => (b.onclick = () => { cat = b.dataset.c; draw(); }));
    let list = PRODUCTS.filter((p) => cat === "All" || p.cat === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rent") list = [...list].filter((p) => p.rent);
    const checking = fitW && fitD;
    if (checking) list = [...list].sort((a, b) => (b.w <= fitW && b.d <= fitD) - (a.w <= fitW && a.d <= fitD));
    grid.innerHTML = list.map((p) => card(p, checking ? p.w <= fitW && p.d <= fitD : undefined)).join("");
    const fits = checking ? list.filter((p) => p.w <= fitW && p.d <= fitD).length : null;
    count.textContent = checking ? `${fits} of ${list.length} items fit a ${fitW} x ${fitD} cm space.` : `${list.length} product${list.length === 1 ? "" : "s"}`;
    wireAddButtons(grid);
  }
  document.getElementById("sort").onchange = (e) => { sort = e.target.value; draw(); };
  document.getElementById("fit-form").onsubmit = (e) => {
    e.preventDefault();
    fitW = +document.getElementById("fit-w").value; fitD = +document.getElementById("fit-d").value;
    if (!fitW || !fitD) { fitW = fitD = null; }
    draw();
  };
  document.getElementById("fit-clear").onclick = () => { fitW = fitD = null; document.getElementById("fit-form").reset(); draw(); };
  draw();
}

function initProduct() {
  const id = new URLSearchParams(location.search).get("id");
  const p = byId(id) || PRODUCTS[0];
  document.title = `${p.name} | Nestora`;
  let mode = "buy", qty = 1;
  const root = document.getElementById("detail");
  function draw() {
    const unit = mode === "rent" ? p.rent : p.price;
    root.innerHTML = `
      <div class="art">${art(p)}</div>
      <div>
        <div class="eyebrow">${p.cat}</div>
        <h1>${p.name}</h1>
        <p>${p.long}</p>
        <div class="big-price">${money(unit)}${mode === "rent" ? '<small style="font-size:1rem;font-weight:600"> / month</small>' : ""}</div>
        <p style="font-size:.85rem">${mode === "rent" ? "Cancel any time after 3 months. Free swap or return when your lease ends." : "Free shipping on orders over $99. 30-day returns."}</p>
        ${p.rent ? `<div class="mode" role="radiogroup" aria-label="Buy or rent">
          <label class="${mode === "buy" ? "on" : ""}" data-m="buy"><b>Buy</b><span>${money(p.price)} one time</span></label>
          <label class="${mode === "rent" ? "on" : ""}" data-m="rent"><b>Rent</b><span>${money(p.rent)} per month</span></label></div>` : ""}
        <div class="buy-row">
          <div class="qty"><button id="minus" aria-label="Decrease quantity">&minus;</button><span id="qv">${qty}</span><button id="plus" aria-label="Increase quantity">+</button></div>
          <button class="btn btn-primary" id="add">Add to cart</button>
          <a href="cart.html" class="btn btn-ghost">View cart</a>
        </div>
        <ul class="ticks">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <dl class="specs">
          <div><dt>Width</dt><dd>${p.w} cm</dd></div><div><dt>Depth</dt><dd>${p.d} cm</dd></div><div><dt>Height</dt><dd>${p.h} cm</dd></div>
          <div><dt>Assembly</dt><dd>Tool-free / basic tools included</dd></div><div><dt>Delivery</dt><dd>3 to 5 business days</dd></div>
        </dl>
      </div>`;
    root.querySelectorAll("[data-m]").forEach((l) => (l.onclick = () => { mode = l.dataset.m; draw(); }));
    document.getElementById("minus").onclick = () => { qty = Math.max(1, qty - 1); document.getElementById("qv").textContent = qty; };
    document.getElementById("plus").onclick = () => { qty = Math.min(10, qty + 1); document.getElementById("qv").textContent = qty; };
    document.getElementById("add").onclick = () => addToCart(p.id, mode, qty);
  }
  draw();
  document.getElementById("crumb").textContent = p.name;
  const rel = PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat).concat(PRODUCTS.filter((x) => x.id !== p.id && x.cat !== p.cat)).slice(0, 4);
  const relEl = document.getElementById("related");
  relEl.innerHTML = rel.map((x) => card(x)).join("");
  wireAddButtons(relEl);
}

function initCart() {
  const list = document.getElementById("lines"), sum = document.getElementById("summary-body");
  const promoInput = document.getElementById("promo-input"), promoMsg = document.getElementById("promo-msg");
  const getPromo = () => localStorage.getItem(PROMO_KEY) === "NESTORA10";
  function draw() {
    const cart = getCart();
    document.getElementById("cart-area").style.display = cart.length ? "grid" : "none";
    document.getElementById("empty").style.display = cart.length ? "none" : "block";
    list.innerHTML = cart.map((l, i) => {
      const p = byId(l.id), u = unitPrice(l);
      return `<div class="cart-line">
        <a href="product.html?id=${p.id}" class="art">${art(p)}</a>
        <div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <span class="tag ${l.mode === "rent" ? "rent" : ""}">${l.mode === "rent" ? "Rental (monthly)" : "Purchase"}</span>
          <div class="qty"><button data-d="${i}" aria-label="Decrease quantity">&minus;</button><span>${l.qty}</span><button data-u="${i}" aria-label="Increase quantity">+</button></div>
          <div><button class="remove" data-r="${i}">Remove</button></div></div>
        <div class="line-price">${money(u * l.qty)}${l.mode === "rent" ? "<small>per month</small>" : `<small>${money(u)} each</small>`}</div></div>`;
    }).join("");
    const subtotal = cart.reduce((s, l) => s + unitPrice(l) * l.qty, 0);
    const discount = getPromo() ? subtotal * 0.1 : 0;
    const after = subtotal - discount;
    const shipping = cart.length === 0 ? 0 : after >= 99 ? 0 : 12.99;
    const tax = (after + shipping) * 0.13;
    const total = after + shipping + tax;
    const toFree = Math.max(0, 99 - after);
    const pct = Math.min(100, (after / 99) * 100);
    sum.innerHTML = `
      <div class="sum-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      ${discount ? `<div class="sum-row"><span>Promo NESTORA10</span><span class="disc">&minus;${money(discount)}</span></div>` : ""}
      <div class="sum-row"><span>Shipping</span><span>${shipping ? money(shipping) : "Free"}</span></div>
      <div class="sum-row"><span>HST (13%)</span><span>${money(tax)}</span></div>
      <div class="sum-row total"><span>Due today</span><span>${money(total)}</span></div>
      <div class="ship-bar" aria-hidden="true"><i style="width:${pct}%"></i></div>
      <p class="note">${toFree > 0 ? `Add ${money(toFree)} more for free shipping.` : "You have unlocked free shipping."}</p>`;
    list.querySelectorAll("[data-u]").forEach((b) => (b.onclick = () => { const c = getCart(); c[+b.dataset.u].qty = Math.min(10, c[+b.dataset.u].qty + 1); saveCart(c); draw(); }));
    list.querySelectorAll("[data-d]").forEach((b) => (b.onclick = () => { const c = getCart(); c[+b.dataset.d].qty = Math.max(1, c[+b.dataset.d].qty - 1); saveCart(c); draw(); }));
    list.querySelectorAll("[data-r]").forEach((b) => (b.onclick = () => { const c = getCart(); c.splice(+b.dataset.r, 1); saveCart(c); draw(); }));
  }
  document.getElementById("promo-btn").onclick = () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === "NESTORA10") { localStorage.setItem(PROMO_KEY, code); promoMsg.textContent = "Promo applied: 10% off."; promoMsg.className = "msg ok"; }
    else { promoMsg.textContent = "That code is not valid. Try NESTORA10."; promoMsg.className = "msg err"; }
    draw();
  };
  const modal = document.getElementById("modal");
  document.getElementById("checkout").onclick = () => {
    document.getElementById("order-no").textContent = "NST-" + Math.floor(100000 + Math.random() * 900000);
    modal.classList.add("open");
  };
  document.getElementById("modal-close").onclick = () => {
    modal.classList.remove("open"); saveCart([]); localStorage.removeItem(PROMO_KEY); promoInput.value = ""; promoMsg.textContent = ""; draw();
  };
  draw();
}

function initContact() {
  const form = document.getElementById("contact-form"), ok = document.getElementById("success");
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email address."),
    topic: (v) => (v ? "" : "Please choose a topic."),
    message: (v) => (v.trim().length >= 10 ? "" : "Please write at least 10 characters."),
  };
  const check = (k) => {
    const f = form.elements[k], msg = rules[k](f.value), box = f.closest(".field");
    box.classList.toggle("bad", !!msg); box.querySelector(".err").textContent = msg; return !msg;
  };
  Object.keys(rules).forEach((k) => form.elements[k].addEventListener("blur", () => check(k)));
  form.onsubmit = (e) => {
    e.preventDefault();
    const valid = Object.keys(rules).map(check).every(Boolean);
    if (!valid) return;
    document.getElementById("ref").textContent = "MSG-" + Math.floor(1000 + Math.random() * 9000);
    document.getElementById("who").textContent = form.elements.name.value.trim().split(" ")[0];
    form.style.display = "none"; ok.classList.add("show");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  const init = { home: initHome, products: initProducts, product: initProduct, cart: initCart, contact: initContact }[document.body.dataset.page];
  if (init) init();
});
