import {getUserName} from "./storage.js";
import logoutButton from "./logoutButton.js";
export default function createButton() {

    const username = getUserName();
    console.log(username);

    let authLink = `<a href="login.html" class="nav-link">Login</a>`;
    

    if(username) {
        authLink = `<ul class="nav justify-content-end"><li class="list-link"><a href="addProducts.html" class="nav-link">Add Product</a></li>
        <li class="list-link"><a href="index.html" id="logout" class="nav-link">Logout ${username}</a></li></ul>
       `;

    } 

    const container = document.querySelector(".loginButton");
    

    container.innerHTML = `${authLink}`;
  


    logoutButton();
}



