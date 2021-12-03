// load product
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = '../js/api.json';
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const title = product.title.split(' ').join('').slice(0, 8);
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
          <img class="product-image" src=${image}></img>
      </div>
            <h3>${product.title}</h3>
            <h5>Category: ${product.category}</h5>
            <h5>Rating: ${product.rating.rate}</h5>
            <h5>Rating By People: ${product.rating.count}</h5>
            <h2>Price: $ ${product.price}</h2>
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-warning text-light">add to cart</button>
      <!-- Button trigger modal -->
  <button type="button"class = "btn btn-dark"data-bs-toggle="modal"data-bs-target="#${title}">Details</button>

<!-- Modal -->
<div class="modal fade" id="${title}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Shopping Cart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
              <img class="product-image" src=${image}></img>
              <h3>${product.title}</h3>
              <p>Category: ${product.category}</p>
              <h5>Rating: ${product.rating.rate}</h5>
              <h5>Rating By People: ${product.rating.count}</h5>
              <h2>Price: $ ${product.price}</h2>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// add to cart
let count = 0;
const addToCart = (id, price) => {
  count ++;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.fround(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.fround(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  else if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  else if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
