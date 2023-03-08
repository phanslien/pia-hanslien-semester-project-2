import { getExistingProducts } from "./utils/cartFunction.js"
const details = document.querySelector(".product-details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idItem = params.get("id");

const url = "https://vast-wave-93218.herokuapp.com/" + "products/"+ idItem;
const productsInCart = getExistingProducts();

async function displayGlasses() {
    try {
        const response = await fetch(url);
        const detailsOfProduct = await response.json();

        details.innerHTML += `
        <div class="row g-0 m-4">
          <div class="col-md-7">
          <img src="https://vast-wave-93218.herokuapp.com/${detailsOfProduct.image.formats.large.url}" class="card-img-top" alt="...">
          <a href="edit.html?id=${detailsOfProduct.id}" class="edit-link"><i class="fa fa-pen"></i> Edit product</a>
          </div>
          <div class="col-md-4 m-4">
            <div class="card-body">
              <h1 class="card-title">${detailsOfProduct.title}</h1>
              <p class="card-text">${detailsOfProduct.description}</p>
              <p class="card-text">$${detailsOfProduct.price}</p>
              <button type="button" class="btn" data-id="${detailsOfProduct.id}" data-title="${detailsOfProduct.title}">Add to cart</button>
              </div>
          </div>
      </div>`;

    }
    catch (error) {
        console.log(error);
    };
   
    const addToCart = document.querySelectorAll(".product-details button");

    addToCart.forEach((button) => {
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

    if(productExisist === undefined) {
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
}

displayGlasses();



