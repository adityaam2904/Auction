import React, { useState } from 'react';

function PostAuction() {
  const [itemName, setItemName] = useState('');
  const [startingBid, setStartingBid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Auction Posted:", { itemName, startingBid });

    // Clear form fields after submission
    setItemName('');
    setStartingBid('');
  };

  return (
    <div>
      <h2>Post a New Auction</h2>
      <form onSubmit={handleSubmit}>
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />

        <label>Starting Bid ($):</label>
        <input
          type="number"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          required
        />

        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
