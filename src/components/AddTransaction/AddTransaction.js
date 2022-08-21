import React, { useState, useContext } from 'react';
import { addTransactionService } from '../../services/transactionService';

//Context
import { Context } from '../../context/UserContext';
import { TransactionContext } from '../../context/TransactionContext';


//Styles
import './AddTransactionStyle.css';
import toast, { Toaster } from 'react-hot-toast';

const AddTransaction = () => {
    const [user, setUser] = useContext(Context);
    const [state, dispatch] = useContext(TransactionContext);


    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        addTransactionService(user.username, type, category, amount)
          .then(transaction => {
            dispatch({ type: "ADD", payload: transaction });
            toast.success('You successfully add new transaction 📒');
            setType('');
            setCategory('');
            setAmount('');
            
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
    <>
    <Toaster />
    <h3>Add new transaction</h3>
    <form className='form-container' onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="text">Category</label><br />
        <select value={category} id="type" onChange={e => setCategory(e.target.value)}>
          <option value="">Choose category</option>
          <option value="salary">Salary</option>
          <option value="savings">Savings</option>
          <option value="tips">Tips</option>
          <option value="investment">Investment</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="fuel">Fuel</option>
          <option value="car-parts">Car Parts</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="type">Type</label><br />
        <select value={type} id="type" onChange={e => setType(e.target.value)}>
          <option value="">Type of transaction</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount</label><br/>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
      </div>
      <button className="btn">Add</button>
    </form>
  </>
  )
}

export default AddTransaction