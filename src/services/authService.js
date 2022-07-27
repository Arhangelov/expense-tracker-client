const url = 'http://localhost:5000/auth';

const getUser = async (username, email) => {
    return fetch ( url + `/getUser`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
    }).then(res => res.json())
}

const registerService = async ( email, username, password, confirmPassword ) => {
    return fetch ( url + '/register' , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, confirmPassword }),
    }).then(res => res.json())
};

const loginService = async ( email, password ) => {
    return fetch(url + '/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    }).then(res => res.json())
};

const logoutService = async ( ) => {
    return fetch(url + '/logout', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then(res => res.json())
};

export {
    getUser,
    registerService,
    loginService,
    logoutService
}