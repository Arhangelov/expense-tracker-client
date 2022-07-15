const url = 'http://localhost:5000/auth';

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

export {
    registerService,
    loginService
}