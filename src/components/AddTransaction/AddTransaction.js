import React, { useState, useContext } from 'react';
import { addTransactionService } from '../../services/transactionService';

//Context
import { Context } from '../../context/UserContext';

//Styles
import './AddTransactionStyle.css';

const AddTransaction = () => {
    const [user, setUser] = useContext(Context);

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user.username, type, name, amount);
        addTransactionService(user.username, type, name, amount)
          .then(transactions => console.log(transactions))
    }

  return (
    <>
    <h3>Add new transaction</h3>
    <form className='form-container' onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="text">Name</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter text..." />
      </div>
      <div className="form-control">
        <label htmlFor="type">Type</label><br />
        <select value={type} id="type" onChange={e => setType(e.target.value)}>
          <option value="">--Choose type of transaction</option>
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