import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Dummy auction items (since backend logic is removed)
  const [items] = useState([
    { _id: 1, itemName: "iPhone 14", currentBid: 500, status: "open" },
    { _id: 2, itemName: "Gaming Laptop", currentBid: 1200, status: "closed" },
    { _id: 3, itemName: "Smartwatch", currentBid: 200, status: "open" }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div>
      <h2>Auction Dashboard</h2>

      {/* Logout Button */}
      <button onClick={handleLogout} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
        Logout
      </button>

      {/* Post New Auction Button */}
      <Link to="/post-auction">
        <button>Post New Auction</button>
      </Link>

      {/* Auction List (Now using dummy data) */}
      {items.length === 0 ? (
        <p>No auctions available.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <Link to={`/auction/${item._id}`}>
                {item.itemName} - Current Bid: ${item.currentBid} {item.status === 'closed' ? '(Closed)' : ''}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
