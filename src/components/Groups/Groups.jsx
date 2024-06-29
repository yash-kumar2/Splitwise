import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import GroupsCard from './GroupsCard';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const token = useSelector((state) => state.auth.token); // Retrieve token from Redux store

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/groups', {
          headers: {
            Authorization: `Bearer ${token}` // Set Authorization header with Bearer token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Handle error as needed
      }
    };

    if (token) { // Ensure token is available before fetching groups
      fetchGroups();
    }
  }, [token]); // Dependency on token ensures useEffect runs when token changes

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      {groups.map((group) => (
        <Link key={group.id} to={`/groups/${group.id}`}>
          <GroupsCard group={group} />
        </Link>
      ))}
    </div>
  );
};

export default GroupsPage;
