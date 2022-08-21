import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

//Context
import { TransactionContext } from '../../context/TransactionContext';


const ExpenseChart = () => {
    const [state, dispatch] = useContext(TransactionContext);
    const [expense, setExpense] = useState({
        labels: state
            .filter((transaction) => transaction.type === 'expense')
            .map((transaction) => transaction.category),
        datasets: [{
            label: 'Expense',
            data: state
                .filter((transaction) => transaction.type === 'expense')
                .map((transaction) => transaction.amount),
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
            labels: state
                .filter((transaction) => transaction.type === 'expense')
                .map((transaction) => transaction.category),
            datasets: [{
                label: 'Income',
                data: state
                    .filter((transaction) => transaction.type === 'expense')
                    .map((transaction) => transaction.amount),
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