import { useContext, useState } from 'react';

//Chart.js and React-Chart.js-2 Components
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

//Context
import { TransactionContext } from '../../context/TransactionContext';
import { useEffect } from 'react';

const IncomeChart = () => {
    const [state, dispatch] = useContext(TransactionContext);
    const [income, setIncome] = useState({
        labels: state
            .filter((transaction) => transaction.type === 'income')
            .reduce((transactions, { category, amount }) => {
                if(!transactions[category]) transactions[amount] = [];
                transactions[amount] += amount;
                return transactions;
            },[])
            .map((transaction) => transaction.category),
        datasets: [{
            label: 'Income',
            data: state
                .filter((transaction) => transaction.type === 'income')
                .map((transaction) => transaction.amount),
            backgroundColor: [
                '#b2e2e2',
                '#66c2a4',
                '#238b45'
            ]
        }]
    })

    useEffect(() => {
        setIncome({
            labels: state
                .filter((transaction) => transaction.type === 'income')
                .map((transaction) => transaction.category),
            datasets: [{
                label: 'Income',
                data: state
                    .filter((transaction) => transaction.type === 'income')
                    .map((transaction) => transaction.amount),
                backgroundColor: [
                    '#b2e2e2',
                    '#66c2a4',
                    '#238b45'
                ]
            }]
        });
    },[state])

  return (
    <div>
        <Doughnut 
            data={
                income
            }
            height={250}
            width={250}
            options={{
                maintainAspectRatio: false
            }}
        />
    </div>
  )
}

export default IncomeChart