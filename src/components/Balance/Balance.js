import React from 'react';
import { useContext } from 'react';

//Context
import { TransactionContext } from '../../context/TransactionContext';
import'./BalanceStyle.css';


const Balance = () => {
  const [state, dispatch] = useContext(TransactionContext)

  return (
    <>
        <h4>Your Balance</h4>
        <h1 className="balance">
          $ {state.reduce((total, current) => total + (current.type === 'income' ? current.amount : -current.amount), 0)}
        </h1>
    </>
  )
}

export default Balance