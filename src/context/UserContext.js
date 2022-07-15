import React, {useState, createContext} from 'react';

export const Context = createContext();

export const UserContext = (props) => {
    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    return (
        <Context.Provider value={[user, setUser]}>
            {props.children}
        </Context.Provider>
    )
}