export function getExistingProducts() {

    const items = localStorage.getItem("productsInCart");

    if(items === null) {
        return [];
    }
    else {
        return JSON.parse(items);
    }
};