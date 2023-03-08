import { getExistingProducts } from "./utils/cartFunction.js"
import { baseUrl } from "./settings/api.js";
import createButton from "./utils/loggedIn.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./utils/deleteButton.js";
import displayMessage from "./settings/displayMessage.js";

const token = getToken();

if(!token) {
    location.href = "/";
}

createButton();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idItem = params.get("id");
const url = "https://vast-wave-93218.herokuapp.com/" + "products/"+ idItem;
const form = document.querySelector("form");
const title = document.querySelector(".name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const message = document.querySelector(".message-container");
const idInput = document.querySelector(".id");


(async function() {
    try {
        const response = await fetch(url);
        const detailsToEdit = await response.json();

        title.value = detailsToEdit.title;
        price.value = detailsToEdit.price;
        description.value = detailsToEdit.description;
        idInput.value = detailsToEdit.id;
        

        deleteButton(detailsToEdit.id);

    } catch (error) {
        console.log(error);
    }
    finally {
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue =  description.value.trim();
    const idValue = idInput.value;



    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        displayMessage("Warning", "Please supply proper value", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, idValue)
}

async function updateProduct(title, price, description, id) {
    const url = baseUrl + "products/" + id;

    const data = JSON.stringify({title: title, price: price, description: description });

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${token}`
        },
    };


    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        location.href = "/";

        if(json.updated_at) {
            displayMessage("success", "product updated", ".message-container");
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}