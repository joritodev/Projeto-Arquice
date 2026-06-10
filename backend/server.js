const dns = require('dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Windows/local DNS often refuses SRV lookups used by mongodb+srv://
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.set('trust proxy', 1);

const corsOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://projeto-arquice.vercel.app',
];

app.use(cors({
  origin(origin, callback) {
    if (
      !origin ||
      corsOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
}));

app.use(express.json());

// SERVIR IMAGENS PUBLICAMENTE
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/site-config', require('./routes/siteConfig'));
app.use('/api/upload', require('./routes/upload'));

// app.use('/api/payments', require('./routes/payments'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});