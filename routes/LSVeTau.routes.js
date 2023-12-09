'use strict';
const express = require('express');
const LLSVeTauController = require('../controllers/LSVeTau.controller.js');
const router = express.Router();
    
const { getLSDatVe } = LLSVeTauController;

router.get('/getLSDatVe', getLSDatVe);
module.exports = {
    routes: router,
};
