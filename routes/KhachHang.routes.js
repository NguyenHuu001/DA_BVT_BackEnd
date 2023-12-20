'use strict';
const express = require('express');
const KhachHangController = require('../controllers/KhachHang.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const { getDetailKH, updateKhachHang, getKhachHangById, getAllKhachHang, updateKhachHangByAdmin, deleteKhachHang } =
    KhachHangController;

const { verifyAdmin, verifyUser } = authenticate;
router.get('/getDetailKH', getDetailKH);
router.get('/khach-hang/:id', getKhachHangById);
router.get('/all-khach-hang', verifyAdmin, getAllKhachHang);
router.put('/updateKhachHang', updateKhachHang);
router.put('/update', verifyAdmin, updateKhachHangByAdmin);
router.delete('/delete/:id', verifyAdmin, deleteKhachHang);
module.exports = {
    routes: router,
};
