import { baseUrl } from "./settings/api.js";
import createButton from "./utils/loggedIn.js";

const productsUrl = baseUrl + "products";
createButton();

(async function () {
    const productsContainer = document.querySelector(".product");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        productsContainer.innerHTML = "";

        json.forEach(function (product) {
            const featured = product.featured;
            if (featured !== true) {
                return false;
            }
            productsContainer.innerHTML += `
            <div class="card-body p-3">
            <a href="product-details.html?id=${product.id}">
            <img src="https://vast-wave-93218.herokuapp.com${product.image.formats.large.url}" class="card-img-top" alt="...">
            <a href="edit.html?id=${product.id}" class="edit-link"><i class="fa fa-pen"></i> Edit product</a>
            <a href="product-details.html?id=${product.id}"><h2 class="pt-2"> ${product.title}</h2></a> 
            <a href="product-details.html?id=${product.id}"><p>Price: ${product.price}</p></a> 
            <a href="product-details.html?id=${product.id}">
            <button type="button" class="btn" style="--bs-btn-padding-y:0.3rem; --bs-btn-padding-x: 1.5rem; --bs-btn-font-size: var(--size-text);">View</button></a>
            </div>`;
        });

    } catch (error) {
        console.log(error);
    }

    

})();
