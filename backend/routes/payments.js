const express = require('express');
const mercadopago = require('mercadopago');
const SiteConfig = require('../models/SiteConfig');

const router = express.Router();

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

// Create Pix payment
router.post('/pix', async (req, res) => {
  const { amount, description } = req.body;
  const config = await SiteConfig.findOne();
  if (!config) return res.status(400).json({ error: 'Site config not found' });

  const payment_data = {
    transaction_amount: amount,
    description: description,
    payment_method_id: 'pix',
    payer: {
      email: 'payer@example.com', // or from user
    },
  };

  try {
    const payment = await mercadopago.payment.create(payment_data);
    res.json({
      qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;