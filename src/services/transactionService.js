const url = 'https://expenses-tracker-production.up.railway.app/transaction';

const getTransactionService = async ( username ) => {
    return fetch ( url + '/get' , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
    }).then(res => res.json())
};

const addTransactionService = async ( username, type, category, amount ) => {
    return fetch ( url + '/add' , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, category, type, amount }),
    }).then(res => res.json())
};

const deleteTransactionService = async ( id, username ) => {
    return fetch ( url + `/delete/${id}` , {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),

    }).then(res => res.json())
};

export {
    getTransactionService,
    addTransactionService,
    deleteTransactionService
}
