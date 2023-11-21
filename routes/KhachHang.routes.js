'use strict';
const express = require('express');
const KhachHangController = require('../controllers/KhachHang.controller.js');
const router = express.Router();

const { getDetailKH, updateKhachHang } = KhachHangController;

router.get('/getDetailKH', getDetailKH);
router.put('/updateKhachHang', updateKhachHang);
module.exports = {
    routes: router,
};
