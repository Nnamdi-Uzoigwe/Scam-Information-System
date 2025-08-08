const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// //register user
// const registerUser = async (req, res) => {
//     try {
//       const { username, email, password } = req.body;
  
//       const userExists = await User.findOne({ email });
//       if (userExists) return res.status(400).json({ message: 'Email already registered' });
  
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newUser = new User({ username, email, password: hashedPassword });
//       await newUser.save();
  
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

//register user
const registerUser = async (req, res) => {
    try {
      const { username, email, password, gender, stateOfOrigin, age } = req.body;

      // Validation
      if (!username || !email || !password || !gender || !stateOfOrigin || !age) {
        return res.status(400).json({ 
          message: 'All fields are required: username, email, password, gender, state of origin, and age' 
        });
      }

      // Email validation
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Password validation
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }

      // Age validation
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
        return res.status(400).json({ message: 'Age must be between 13 and 120' });
      }

      // Gender validation
      const validGenders = ['male', 'female', 'other'];
      if (!validGenders.includes(gender.toLowerCase())) {
        return res.status(400).json({ message: 'Gender must be male, female, or other' });
      }

      // Nigerian states validation
      const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
        'Yobe', 'Zamfara'
      ];
      
      if (!nigerianStates.includes(stateOfOrigin)) {
        return res.status(400).json({ message: 'Please select a valid Nigerian state' });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Email already registered' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword,
        gender: gender.toLowerCase(),
        stateOfOrigin,
        age: ageNum
      });
      
      await newUser.save();
  
      res.status(201).json({ 
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          gender: newUser.gender,
          stateOfOrigin: newUser.stateOfOrigin,
          age: newUser.age
        }
      });
    } catch (err) {
      console.error('Registration error:', err);
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
  


