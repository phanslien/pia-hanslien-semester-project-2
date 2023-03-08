import { getExistingProducts } from "./utils/cartFunction.js";

let productsInCart = getExistingProducts();

const productDetails = document.querySelector(".product-details");

productsInCart.forEach((item) => {

  productDetails.innerHTML += `
    <div class="row g-0 m-4">
      <div class="col-md-7">
        <img src="/public/uploads/9_4004a7d822.jpg" class="card-img-top" alt="...">
      </div>
      <div class="col-md-4 m-4">
        <div class="card-body cart">
          <h1 class="card-title">${item.title}</h1>
          <p>Price: ${item.price}</p>
          <a href="/cart.html"><button type="button" class="btn" style="--bs-btn-padding-y:0.3rem; --bs-btn-padding-x: 1.5rem; --bs-btn-font-size: var(--size-text);"  data-id="${item.id}" data-title="${item.title}">Remove from cart</button></a>

        </div>
      </div>
    </div>`;
});

const removeFromCart = document.querySelectorAll("button");

removeFromCart.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick() {
        this.classList.toggle(".btn");
       
        const id = this.dataset.id;
        const title = this.dataset.title;

    const currentCart = getExistingProducts();
  

    const productExisist = currentCart.find(function(prod) {
        return prod.id === id;
    });

    if(productExisist === null) {
        const product = { id: id, title: title};
        currentCart.push(product);
        saveProducts(currentCart);
    }
    else {
        const newProductsToCart = currentCart.filter(prod => prod.id !== id);
        saveProducts(newProductsToCart);
    }
  }
    
    function saveProducts(items) {
        localStorage.setItem("productsInCart", JSON.stringify(items));
    }
