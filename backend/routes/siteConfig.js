const express = require('express');
const jwt = require('jsonwebtoken');
const SiteConfig = require('../models/SiteConfig');

const router = express.Router();

// Middleware to check JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET site config
router.get('/', async (req, res) => {
  const config = await SiteConfig.findOne();
  res.json(config);
});

// PUT site config (protected)
router.put('/', authenticate, async (req, res) => {
  const config = await SiteConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(config);
});

module.exports = router;