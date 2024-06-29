import React from 'react';

const ExpenseCard = ({ expense }) => {
  const date = new Date(expense.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="flex items-start mb-4">
      <div className="w-24 text-left mr-4"> {/* Changed to text-left */}
        <div className="text-lg font-bold">{formattedDate.split(' ')[1]}</div>
        <div className="text-sm text-gray-600">{month}</div>
      </div>
      <div className="flex-1 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold mb-2">{expense.description}</h3>
        <p className="text-sm">
          {expense.amount > 0 
            ? `You lent ${expense.for.name} ₹${expense.amount}` 
            : `${expense.for.name} lent you ₹${-expense.amount}`
          }
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
