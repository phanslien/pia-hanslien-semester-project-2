import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";

export default function deleteButton(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="delete btn btn-no-float">Delete</button>`;

    const button = document.querySelector("button.delete");

    button.onclick = async function () {
        console.log(id);


        const doDelete = confirm("Are you sure you want to delete this?");

        if(doDelete) {
            const url = baseUrl  + "products/" + id;

            const token = getToken();
    
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            try {
                const respone = await fetch(url, options);
                const json = await respone.json();


                location.href = "/";
    
            } catch (error) {
                console.log(error);
            }
        }
        
    }
}