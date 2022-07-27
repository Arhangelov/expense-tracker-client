const url = 'http://localhost:5000/transaction';

const getTransactionService = async ( username ) => {
    return fetch ( url + '/get' , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
    }).then(res => res.json())
};

const addTransactionService = async ( username, type, name, amount ) => {
    return fetch ( url + '/add' , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, type, amount }),
    }).then(res => res.json())
};

export {
    getTransactionService,
    addTransactionService,
}
