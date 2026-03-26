function setCookie(name, value, ttl, path="/") {
    const date = new Date();
    date.setTime(date.getTime() + (ttl*24*60*60*1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=${path}`;
}

function getCookie(name) {
    const cookiesArray = document.cookie.split("; ");
    let result = null;
    cookiesArray.forEach(e => {
        if(e.indexOf(name) === 0) {
            result = e.substring(name.length + 1);
        }
    });
    return result;
}

function deleteCookie(name, path="/") {
    setCookie(name, null, null, path);
}