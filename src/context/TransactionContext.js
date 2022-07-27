import React, {useReducer, createContext} from "react";

export const TransactionContext = createContext();

const reducer = (state, action) => {   
    switch (action.type) {
        case "ADD":
            if(state.find((e) => e.id === action.id)) return [...state];
            return [...state, action.payload];
        default:
            throw new Error(`unknown action ${action.type}`);
    }
}

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer( reducer, [] )

    return (
        <TransactionContext.Provider value={[state, dispatch]}>
            {children}
        </TransactionContext.Provider>
    )
}