'use strict';
const express = require('express');
const TaiKhoanNVController = require('../controllers/TaiKhoanNV.controller');
const router = express.Router();

const { loginAccountNV } = TaiKhoanNVController;

router.post('/loginAccountNV', loginAccountNV);
module.exports = {
    routes: router,
};
