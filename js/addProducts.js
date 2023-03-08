import { baseUrl } from "./settings/api.js";
import createButton from "./utils/loggedIn.js";
import { clearStorageLogout } from "./utils/storage.js";
import { getToken } from "./utils/storage.js";
import displayMessage from "./settings/displayMessage.js";

const token = getToken();

if(!token) {
    location.href = "/";
}

createButton();

const form = document.querySelector("form");
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const message = document.querySelector(".message-container");

form,addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue =  description.value.trim();

    console.log("priceValue", priceValue);

    if(nameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        displayMessage("Warning", "Please supply proper value", ".message-container");
    }

    addProduct(nameValue, priceValue, descriptionValue);

}

async function addProduct(title, price, description) {
    const url = baseUrl + "products";

    const data = JSON.stringify({title: title, price: price, description: description });


    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();


        if(json.created_at) {
            displayMessage("Success", "Product created", ".message-container");
            form.reset();
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);
    } catch(error) {
        console.log(error);
        displayMessage("error", "Error", ".message-container");
    }
}