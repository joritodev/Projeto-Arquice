const express = require('express');
const multer = require('multer');
const path = require('path');

const SiteConfig = require('../models/SiteConfig');

const authenticate = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const router = express.Router();


// CONFIG MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1E9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });


// GET SITE CONFIG
router.get('/', async (req, res) => {
  try {

    const config = await SiteConfig.findOne();

    res.json(config);

  } catch (err) {

    res.status(500).json({
      error: 'Server error',
    });

  }
});


// UPLOAD IMAGENS
router.post(
  '/upload',
  authenticate,
  requireAdmin,

  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'about', maxCount: 1 },
    { name: 'cause', maxCount: 1 },
  ]),

  async (req, res) => {

    try {

      const files = req.files;

      const response = {};

      if (files.logo) {
        response.logo =
          `/uploads/${files.logo[0].filename}`;
      }

      if (files.banner) {
        response.banner =
          `/uploads/${files.banner[0].filename}`;
      }

      if (files.about) {
        response.about =
          `/uploads/${files.about[0].filename}`;
      }

      if (files.cause) {
        response.cause =
          `/uploads/${files.cause[0].filename}`;
      }

      res.json(response);

    } catch (err) {

      res.status(500).json({
        error: 'Erro upload',
      });

    }
  }
);


// UPDATE CONFIG
router.put(
  '/',
  authenticate,
  requireAdmin,

  async (req, res) => {

    try {

      const config = await SiteConfig.findOneAndUpdate(
        {},
        req.body,
        {
          new: true,
          upsert: true,
        }
      );

      res.json(config);

    } catch (err) {

      res.status(500).json({
        error: 'Server error',
      });

    }
  }
);

module.exports = router;