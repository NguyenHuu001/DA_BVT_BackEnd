'use strict';
const express = require('express');
const KhachHangController = require('../controllers/KhachHang.controller.js');
const router = express.Router();

const { getDetailKH, updateKhachHang, getKhachHangById, getAllKhachHang, updateKhachHangByAdmin, deleteKhachHang } =
    KhachHangController;

router.get('/getDetailKH', getDetailKH);
router.get('/khach-hang/:id', getKhachHangById);
router.get('/all-khach-hang', getAllKhachHang);
router.put('/updateKhachHang', updateKhachHang);
router.put('/update', updateKhachHangByAdmin);
router.delete('/delete/:id', deleteKhachHang);
module.exports = {
    routes: router,
};
