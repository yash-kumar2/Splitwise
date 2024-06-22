import React, { useEffect, useState } from 'react';
import FriendsCard from './FriendsCard';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Simulate an API call
    const fetchFriends = async () => {
      const response = await fetch('/api/friends'); // Replace with your actual API endpoint
      const data = await response.json();
      setFriends(data);
    };

    // For testing purposes, using hardcoded data
    const testFriends = [
      { name: 'Alice', amount: 50 },
      { name: 'Bob', amount: -20 },
      { name: 'Charlie', amount: 30 },
      { name: 'David', amount: -10 }
    ];

    setFriends(testFriends);
    // Uncomment the next line to use actual API call
    // fetchFriends();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      {friends.map((friend, index) => (
        <FriendsCard key={index} name={friend.name} amount={friend.amount} />
      ))}
    </div>
  );
};

export default FriendsPage;
