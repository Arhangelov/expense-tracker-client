import React, { useEffect, useContext } from 'react';
import { deleteTransactionService, getTransactionService } from '../../services/transactionService';
import toast, { Toaster } from 'react-hot-toast';

//Contexts
import { TransactionContext } from '../../context/TransactionContext';
import { Context } from '../../context/UserContext';

//Components
import { TiDelete } from 'react-icons/ti';

//Styles
import './TransactionList.css'

const TransactionList = () => {
    const [user, setUser] = useContext(Context);
    const [state, dispatch] = useContext(TransactionContext);

    const onDeleteHandler = ( transactionId ) => {
      deleteTransactionService(transactionId, user.username)
        .then(res => {
          dispatch({ type: "REMOVE", payload: transactionId });
          toast.success('Deleting transaction was successful ❌');
        }).catch(err => {
          toast.error(`${err}`, {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            }
          })
        })
    }

    useEffect(() => {

      getTransactionService(user.username)
        .then(transactionsList => {
        dispatch({ type: "SET", payload: [...transactionsList] });
        })
    }, [dispatch, user.username]);
  return (
    <>
        <Toaster/>
        <h3>History</h3>
        <div className="list-container">
            {state.map((transaction) => (
                <table>
                  <tbody>
                    <tr key={transaction.id}>
                      <td className="td">{transaction.category}</td>
                      <td className="td">${transaction.amount}</td>
                      <td className="td"><button className='btn-delete' onClick={() => onDeleteHandler(transaction.id)}><TiDelete /></button></td>
                    </tr>
                  </tbody>
                </table> 
              ))}

        </div>
    </>
  )
}

export default TransactionList