
const products = [
  { id: 1, name: "Crime and Punishment", price: 750, image: "5911450071633873280.jpg" },
  { id: 2, name: "White Nights", price: 500, image: "5911450071633873296.jpg" },
  { id: 3, name: "A Tale of Two Cities", price: 80, image: "5911450071633873297.jpg" },
  { id: 4, name: "To Kill a Mockingbird", price: 40, image: "5911450071633873298.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

// Render products
productList.innerHTML = products.map(p => `
  <div class="product-card">
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  </div>
`).join("");

// Add to cart
const addToCart = (id) => {
  const product = products.find(p => p.id === id);
  const item = cart.find(c => c.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
};

// Render cart
const renderCart = () => {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = 0;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <div>
        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <span>$${item.price * item.quantity}</span>
      <button onclick="removeItem(${item.id})">❌</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.textContent = total;
};

// Change quantity
const changeQuantity = (id, amount) => {
  cart = cart.map(item =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
  );
  saveCart();
  renderCart();
};

// Remove item
const removeItem = (id) => {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
};

// Save to localStorage
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

// Initialize cart
renderCart();
