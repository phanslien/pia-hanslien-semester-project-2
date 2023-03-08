const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken () {
    return getFromStorage(tokenKey);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUserName() {
    const user = getFromStorage(userKey);

    if(user) {
        return user.username;
    }

    return null;
}

export function clearStorageLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    location.href = "favourites.html";
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if(!value) {
        return null;
    }
    return JSON.parse(value);
}