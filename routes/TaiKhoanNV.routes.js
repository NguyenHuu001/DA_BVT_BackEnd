'use strict';
const express = require('express');
const TaiKhoanNVController = require('../controllers/TaiKhoanNV.controller');
const router = express.Router();

const {getAllTaiKhoanNV} = TaiKhoanNVController;

router.get('/getAllTKNV', getAllTaiKhoanNV);
module.exports = {
    routes:router
}