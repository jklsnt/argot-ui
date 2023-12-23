import Cookie from "js-cookie";

export function setCookie(c_name, value) {
    console.log(c_name, value);
    Cookie.set(c_name, value);
}

export function deleteCookie(name) {
    Cookie.remove(name);
}

export function getCookie(name) {
    return Cookie.get(name);
}

