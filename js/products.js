import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { search } from "./ui/search.js";

const productsUrl = baseUrl + "products";

async function getProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        renderProducts(products);
        search(products);
    } catch (error) {
        console.log(error);
    }};

    getProducts();


