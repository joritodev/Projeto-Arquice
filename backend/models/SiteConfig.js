const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  orgEmail: { type: String, required: true },
  contactEmail: { type: String, required: true },
  pixKey: { type: String, required: true },

  orgName: { type: String, required: true },
  orgFullName: { type: String, required: true },
  orgDescription: { type: String, required: true },
  orgCnpj: { type: String, required: true },

  contactPhone: { type: String, default: "" },

  contactAddress: {
    street: { type: String, default: "" },
    neighborhood: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
  },

  socialMedia: {
    instagram: { type: String, default: "" },
  },

  images: {
    logo: { type: String, default: "" },
    banner: { type: String, default: "" },
    about: { type: String, default: "" },
    cause: { type: String, default: "" },
  },

  faviconPath: { type: String, default: "" },

}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);