'use strict';
const express = require('express');
const TaiKhoanKHController = require('../controllers/ChuyenTau.controller.js');
const router = express.Router();

const { getAllChuyenTau, searchChuyenTau } = TaiKhoanKHController;

router.get('/getAllChuyenTau', getAllChuyenTau);
router.get('/searchChuyenTau', searchChuyenTau);
module.exports = {
    routes: router,
};
