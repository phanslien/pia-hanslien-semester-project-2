import { clearStorageLogout } from "./storage.js";
import { getUserName } from "./storage.js";

export default function logoutButton() {
    const username = getUserName();
    const button = document.querySelector("#logout");

    if(button) {
        button.onclick = function() {
            const doLogout = confirm("Are you sure?");

            if(doLogout) {
                clearStorageLogout();
                location.href = "/";
            }
        }
    }
}