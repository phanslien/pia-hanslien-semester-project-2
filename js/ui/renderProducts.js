export function renderProducts(productsToRender) {
    const productsContainer = document.querySelector(".products");

    productsContainer.innerHTML = "";
      
    productsToRender.forEach(function (product) {
            productsContainer.innerHTML += `<div class="card-body p-3">
                                            <a href="product-details.html?id=${product.id}">
                                            <img src="https://vast-wave-93218.herokuapp.com${product.image.formats.large.url}" class="card-img-top" alt="...">
                                            <a href="edit.html?id=${product.id}" class="edit-link"><i class="fa fa-pen"></i> Edit product</a>
                                            <h2 class="pt-2">${product.title}</h2>
                                            <p>${product.description}</p>
                                            <p>Price: ${product.price}</p>
                                            </a>    
                                            <button type="button" class="btn" style="--bs-btn-padding-y:0.3rem; --bs-btn-padding-x: 1.5rem; --bs-btn-font-size: var(--size-text);">View</button>
                                            
                                            </div>`;
        });   
    }