const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//register user
const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Email already registered' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

//login user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
      const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    registerUser,
    loginUser,
  };
  


