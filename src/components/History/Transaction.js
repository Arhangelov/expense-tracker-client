import { useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
//Icons
import { TiDelete } from 'react-icons/ti';
//Contexts
import { TransactionContext } from '../../context/TransactionContext';
import { Context } from '../../context/UserContext';
//Services
import { deleteTransactionService, getTransactionService } from '../../services/transactionService';

const Transaction = ({ transaction }) => {
  const [user, setUser] = useContext(Context);
  const [state, dispatch] = useContext(TransactionContext);

  // useEffect(() => {
  //   getTransactionService(user.username)
  //     .then(transactionList => {
  //       dispatch({ type: 'SET', payload: [...transactionList]})
  //     })
  // },[])

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

  return (
    <tbody>
    <Toaster />
      <tr key={transaction.id}>
        <td>{transaction.name}</td>
        <td>${transaction.amount}</td>
        <td><button onClick={() => onDeleteHandler(transaction.id)}><TiDelete /></button></td>
      </tr>
    </tbody> 
  )
}

export default Transaction