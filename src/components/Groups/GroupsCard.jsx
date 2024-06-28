import React from 'react';

const GroupsCard = ({ group }) => {
  const netDebt = group.friends.reduce((acc, friend) => acc + friend.amount, 0);
  const netDebtClass = netDebt > 0 ? 'text-green-500' : 'text-red-500';
  const netDebtText = netDebt > 0 ? `You are owed $${netDebt}` : `You owe $${Math.abs(netDebt)}`;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      <h2 className="font-bold text-xl mb-2">{group.name}</h2>
      {group.friends.length > 0 ? (
        <>
          <p className={`${netDebtClass} font-bold mb-2`}>{netDebtText}</p>
          {group.friends.slice(0, 3).map((friend, index) => {
            const friendAmountClass = friend.amount > 0 ? 'text-green-500' : 'text-red-500';
            const friendAmountText = friend.amount > 0 ? `Owes you $${friend.amount}` : `You owe $${Math.abs(friend.amount)}`;
            return (
              <p key={index} className={`${friendAmountClass} mb-1`}>
                {friend.name} {friendAmountText}
              </p>
            );
          })}
        </>
      ) : (
        <p className="text-gray-500">No expenses</p>
      )}
    </div>
  );
};

export default GroupsCard;
