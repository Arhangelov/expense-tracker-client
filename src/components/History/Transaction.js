import React from 'react'

const Transaction = ({ transaction }) => {
  console.log('HISTORY:', transaction);
  return (
    <li>
        {transaction.name}
        <span>{transaction.amount}</span>
        <button className='delete-btn'>x</button>
    </li>
  )
}

export default Transaction