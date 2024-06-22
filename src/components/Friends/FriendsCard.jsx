import React from 'react';

const FriendsCard = ({ name, amount }) => {
  const amountClass = amount > 0 ? 'text-green-500' : 'text-red-500';
  const amountText = amount > 0 ? `Owes you $${amount}` : `You owe $${Math.abs(amount)}`;

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <span className="font-bold text-lg">{name}</span>
      <span className={`${amountClass} font-bold`}>{amountText}</span>
    </div>
  );
};

export default FriendsCard;
