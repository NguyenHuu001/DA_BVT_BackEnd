'use strict';
const express = require('express');
const TaiKhoanKHController = require('../controllers/ChuyenTau.controller.js');
const router = express.Router();

const { getAllChuyenTau, searchChuyenTau, searchPriceTicket } = TaiKhoanKHController;

router.get('/getAllChuyenTau', getAllChuyenTau);
router.get('/searchChuyenTau', searchChuyenTau);
router.get('/searchPriceTicket', searchPriceTicket);
module.exports = {
    routes: router,
};
