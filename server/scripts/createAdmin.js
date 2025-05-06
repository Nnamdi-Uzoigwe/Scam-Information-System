const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Admin = require('../models/Admin');

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const email = 'admin@gmail.com';
  const plainPassword = 'examplePassword';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    return process.exit();
  }

  const admin = new Admin({
    username: 'Admin001',
    email,
    password: hashedPassword,
  });

  await admin.save();
  console.log('✅ Admin created!');
  process.exit();
};

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
