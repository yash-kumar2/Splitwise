import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GroupsCard from './GroupsCard';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Simulate an API call
    const fetchGroups = async () => {
      const response = await fetch('/api/groups'); // Replace with your actual API endpoint
      const data = await response.json();
      setGroups(data);
    };

    // For testing purposes, using hardcoded data
    const testGroups = [
      {
        id: 1,
        name: 'Group 1',
        friends: [
          { name: 'Alice', amount: 50 },
          { name: 'Bob', amount: -20 },
        ],
      },
      {
        id: 2,
        name: 'Group 2',
        friends: [
          { name: 'Eve', amount: 40 },
          { name: 'Frank', amount: -15 },
          { name: 'Grace', amount: 25 },
        ],
      },
      {
        id: 3,
        name: 'Group 3',
        friends: [],
      },
    ];

    setGroups(testGroups);
    // Uncomment the next line to use actual API call
    // fetchGroups();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      {groups.map((group) => (
        <Link key={group.id} to={`/${group.id}`}>
          <GroupsCard group={group} />
        </Link>
      ))}
    </div>
  );
};

export default GroupsPage;
