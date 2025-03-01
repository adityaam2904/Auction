import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [bid, setBid] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/auctions/${id}`);
        setItem(res.data);
      } catch (error) {
        setMessage('Error fetching auction item.');
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBid = async () => {
    const username = prompt('Enter your username to place a bid:');

    if (!username) {
      setMessage('Bid cancelled.');
      return;
    }

    if (bid <= item.currentBid) {
      setMessage('Bid must be higher than the current bid.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/auctions/${id}/bid`, { bid, username });
      setMessage(res.data.message);
      setItem(res.data.updatedAuction);
    } catch (error) {
      setMessage('Error placing bid.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{item.itemName}</h2>
      <p>{item.description}</p>
      <p>Current Bid: ${item.currentBid}</p>
      <p>Highest Bidder: {item.highestBidder || 'No bids yet'}</p>
      <input
        type="number"
        value={bid}
        onChange={(e) => setBid(Number(e.target.value))}
        placeholder="Enter your bid"
      />
      <button onClick={handleBid}>Place Bid</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuctionItem;
