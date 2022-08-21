import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

//Context
import { TransactionContext } from '../../context/TransactionContext';


const ExpenseChart = () => {
    const [state, dispatch] = useContext(TransactionContext);

    const newData = state
    .filter((transaction) => transaction.type === 'expense')
    .reduce((transactions, { category, amount }) => {
        if(!transactions[category]) transactions[category] = 0;
        transactions[category] += amount;
        return transactions;
    },{})

    const [expense, setExpense] = useState({
        labels: Object.keys(newData),
        datasets: [{
            label: 'Expense',
            data: Object.values(newData),
            backgroundColor: [
                '#d7301f',
                '#fc8d59',
                '#fdcc8a',
                '#fef0d9'
            ]
        }]
    })

     useEffect(() => {
        setExpense({
            labels: Object.keys(newData),
        datasets: [{
            label: 'Expense',
            data: Object.values(newData),
            backgroundColor: [
                '#d7301f',
                '#fc8d59',
                '#fdcc8a',
                '#fef0d9'
            ]
        }]
        });
    },[state])

  return (
    <div>
        <Doughnut 
            data={expense}
            height={250}
            width={250}
            options={{
                maintainAspectRatio: false
            }}
        />
    </div>
  )
}

export default ExpenseChart