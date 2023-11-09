'use strict';
const express = require('express');
const KhachHangController = require('../controllers/KhachHang.controller.js');
const router = express.Router();

const { getDetailKH } = KhachHangController;

router.get('/getDetailKH', getDetailKH);
module.exports = {
    routes: router,
};
