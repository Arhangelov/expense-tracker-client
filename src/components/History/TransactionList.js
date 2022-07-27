import React, { useEffect, useContext } from 'react';
import { getTransactionService } from '../../services/transactionService';
import toast, { Toaster } from 'react-hot-toast';

//Contexts
import { TransactionContext } from '../../context/TransactionContext';
import { Context } from '../../context/UserContext';

//Components
import Transaction from './Transaction';

const TransactionList = () => {
    const [user, setUser] = useContext(Context);
    const [state, dispatch] = useContext(TransactionContext);

    useEffect(() => {

      getTransactionService(user.username)
        .then(transactionsList => {
          console.log('LIST:',transactionsList);
          dispatch({ type: "ADD", payload: [...transactionsList] })
          console.log('TRANSACTIONS:', state.map(t => t));
        }).catch(err => {
          toast.error(`${err}`, {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              }
          
          })
        })
    }, []);
  return (
    <>
        <Toaster/>
        <h3>History</h3>
        <ul className="list">
            {state.map((transaction) => (
              // <Transaction key={transaction.id} transaction={transaction} />
              <tbody>
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td>${transaction.amount}</td>
                    <td><button>X</button></td>
                  </tr>
              </tbody>
            ))}
        </ul>
    </>
  )
}

export default TransactionList