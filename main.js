const order = JSON.parse(localStorage.getItem("currentOrder"));
const prices = {
  Intel_i9: 150000, AMD_Ryzen_97900: 110000, Intel_i5: 70000, AMD_Ryzen_97950: 135000, Intel_i7: 100000, Ryzen_7: 90000,
  RTX_4070_Ti: 210000, RTX_4080: 320000, RX_7900_XT: 260000, RX_7900_XTX: 195000, RTX_4060: 290000, RX_6700_XT: 95000,
  Z790_E: 85000, B550: 50000, X670E: 100000, B550_A_PRO: 30000, Z590_AORUS_ELITE: 45000, H610M: 25000,
  Corsair_DDR5: 25000, gSkill_DDR4: 14000, Ripjaws_V_32GB: 12000, Corsair_32G: 18000,Kingston_Fury_32GB: 45000,T_Force_16GB:28000,
  samsung_Pro_1TB: 32000, Crucial_P3_500GB: 12000, Crucial_P5_Plus_1TB: 26000, SN850_1TB: 29000, Seagate_2TB: 15000, WD_Blue_1TB: 19000,
};

const ul = document.getElementById("order-summary");
let total = 0;
for (const id in order) {
  const qty = order[id];
  const price = prices[id] * qty;
  total += price;
  const li = document.createElement("li");
  li.textContent = `${id.replace(/_/g, " ")} - Qty: ${qty} - Rs.${price}`;
  ul.appendChild(li);
}
ul.innerHTML += `<li><strong>Total: Rs.${total}</strong></li>`;

document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  const card = document.getElementById("card").value.trim();

  if (name && email && address && /^\d{10}$/.test(card)) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5-day delivery
    alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${deliveryDate.toDateString()}.`);
  } else {
    alert("Please fill in all fields correctly.");
  }

});





function addToCart() {
  const tbody = document.querySelector("#cart-table tbody");
  tbody.innerHTML = "";
  let total = 0;
  for (const id in prices) {
    const qty = parseInt(document.getElementById(id).value || "0");
    if (qty > 0) {
      const price = prices[id] * qty;
      total += price;
      const row = `<tr><td>${id.replace(/_/g, " ")}</td><td>${qty}</td><td>Rs.${price}</td></tr>`;
      tbody.innerHTML += row;
    }
  }
  document.getElementById("total-price").textContent = "Rs." + total;
}

function buyNow() {
  localStorage.setItem("currentOrder", JSON.stringify(getOrderData()));
  window.location.href = "checkout.html";
}

function saveFavourite() {
  localStorage.setItem("favouriteOrder", JSON.stringify(getOrderData()));
  alert("Order saved as favourite.");
}

function applyFavourite() {
  const fav = JSON.parse(localStorage.getItem("favouriteOrder"));
  if (!fav) return alert("No favourite order saved.");
  for (const id in fav) {
    document.getElementById(id).value = fav[id];
  }
  addToCart();
}

function getOrderData() {
  const data = {};
  for (const id in prices) {
    const val = parseInt(document.getElementById(id).value || "0");
    if (val > 0) data[id] = val;
  }
  return data;
}

function openImage(img) {
  const popup = document.getElementById('image-popup');
  const popupImg = document.getElementById('popup-img');
  popupImg.src = img.src;
  popup.style.display = 'flex';
}

function closeImage() {
  document.getElementById('image-popup').style.display = 'none';
}
