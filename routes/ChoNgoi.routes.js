'use strict';
const express = require('express');
const ChoNgoiController = require('../controllers/ChoNgoi.controller.js');
const router = express.Router();

const { getAllChoNgoi } = ChoNgoiController;

router.get('/getAllChoNgoi/:MaCTCT', getAllChoNgoi);
module.exports = {
    routes: router,
};
