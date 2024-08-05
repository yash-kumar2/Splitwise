import React from 'react';
import { TextField } from '@mui/material';

const MemberTable = ({ members, memberAmounts, handleAmountChange }) => {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-2">Member Contributions</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Amount</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.email}>
              <td className="py-2 px-4 border-b border-gray-200">{member.name}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">{member.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <TextField
                  type="number"
                  value={memberAmounts[member.email] || 0}
                  onChange={(e) => handleAmountChange(member.email, e.target.value)}
                  variant="standard"
                  inputProps={{ min: 0 }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
