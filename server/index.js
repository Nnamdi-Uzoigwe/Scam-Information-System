const express = require("express")
const helmet = require("helmet")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors")
const authRoutes = require('./routes/authRoutes');
const scamRoutes = require('./routes/scamRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const adminRoutes = require('./routes/adminRoutes')
dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGO_DB_URI = process.env.MONGO_DB_URI

app.use(express.json());
app.use(helmet())
app.use(bodyParser.json());

const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use('/api/auth', authRoutes);
app.use('/api/scam-reports', scamRoutes);
app.use('/api/testimonial', testimonialRoutes)
app.use('/api/admin', adminRoutes)



mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   
  })
  .catch(err => console.log(err));