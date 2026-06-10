const express = require('express');
const multer = require('multer');
const path = require('path');

const authenticate = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post(
  '/',
  authenticate,
  requireAdmin,
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        error: 'Nenhuma imagem enviada',
      });
    }

    const baseUrl =
      process.env.API_BASE_URL?.replace(/\/$/, '') ||
      `${req.protocol}://${req.get('host')}`;

    res.json({
      imageUrl: `${baseUrl}/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;