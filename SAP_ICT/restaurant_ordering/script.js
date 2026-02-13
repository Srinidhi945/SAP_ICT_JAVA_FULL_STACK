const menuItems = [
  { name: "Pappu Pulusu", price: 50, img: "pappu.jpg" },
  { name: "Gutti Vankaya Curry", price: 60, img: "vankaya.jpg" },
  { name: "Sambar Rice", price: 70, img: "sambar.jpg" },
  { name: "Curd Rice", price: 70, img: "curd_Rice.jpg" },
  { name: "Sweet", price: 100, img: "sweet.jpg" },
  { name: "Meals", price: 150, img: "meals.jpg" },
  { name: "White Rice", price: 40, img: "white_rice.jpg" }
];

const menuContainer = document.getElementById("menu");
const cartItemsContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const cartCountElement = document.getElementById("cart-count");
const cartSection = document.getElementById("cart-section");
const cartToggle = document.getElementById("cart-toggle");

let cart = [];
let total = 0;

// Render menu dynamically
menuItems.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "col-md-4 mb-4";
  card.innerHTML = `
    <div class="card menu-card shadow-sm">
      <img src="${item.img}" alt="${item.name}">
      <div class="card-body text-center bg-light">
        <h5 class="card-title text-success">${item.name}</h5>
        <p class="card-text text-primary">₹${item.price}</p>
        <button class="btn btn-success" onclick="addToCart(${index})">Add to Cart</button>
      </div>
    </div>
  `;
  menuContainer.appendChild(card);
});

// Add item to cart
function addToCart(index) {
  const item = menuItems[index];
  cart.push(item);
  total += item.price;

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `${item.name} <span class="text-danger">₹${item.price}</span>`;
  cartItemsContainer.appendChild(li);

  totalElement.textContent = total;
  cartCountElement.textContent = cart.length;
}

// Place order
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }
  alert("✅ Order received by the kitchen! 🍲 It will be on your table soon.");
  cart = [];
  total = 0;
  cartItemsContainer.innerHTML = "";
  totalElement.textContent = total;
  cartCountElement.textContent = cart.length;
}

// Toggle cart visibility
cartToggle.addEventListener("click", () => {
  cartSection.classList.toggle("d-none");
});
