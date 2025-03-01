require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "my_super_secret_123";

//  Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Auctiondb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

//  User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

//  Auction Item Schema
const auctionSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  currentBid: Number,
  highestBidder: String,
  status: { type: String, default: "open" }
});

const Auction = mongoose.model('Auction', auctionSchema);

//  Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

//  Signup Route
app.post('/signup', async (req, res) => {
  console.log("Signup Request Received:", req.body); //  Debugging

  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Signin Route
app.post('/signin', async (req, res) => {
  console.log("🔍 Signin Request Received:", req.body); // Debug incoming request

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: " Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: " Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: " Invalid credentials" });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(" Signin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get Single Auction Item
app.get('/auctions/:id', verifyToken, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auction item" });
  }
});

//  Place a Bid
app.post('/auctions/:id/bid', verifyToken, async (req, res) => {
  const { bid, username } = req.body;

  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    if (bid <= auction.currentBid) {
      return res.status(400).json({ message: "Bid must be higher than current bid" });
    }

    auction.currentBid = bid;
    auction.highestBidder = username;
    await auction.save();

    res.status(200).json({ message: "Bid placed successfully", updatedAuction: auction });
  } catch (error) {
    res.status(500).json({ message: "Error placing bid" });
  }
});

//  Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
