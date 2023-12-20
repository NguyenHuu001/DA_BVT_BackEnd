'use strict';
const express = require('express');
const TaiKhoanKHController = require('../controllers/ChuyenTau.controller.js');
const router = express.Router();

const { getAllChuyenTau, searchChuyenTau, searchPriceTicket, addTrains } = TaiKhoanKHController;

router.get('/getAllChuyenTau', getAllChuyenTau);
router.get('/searchChuyenTau', searchChuyenTau);
router.get('/searchPriceTicket', searchPriceTicket);
router.post('/addTrains', addTrains);
module.exports = {
    routes: router,
};
