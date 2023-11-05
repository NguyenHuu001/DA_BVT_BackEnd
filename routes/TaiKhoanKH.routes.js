'use strict';
const express = require('express');
const TaiKhoanKHController = require('../controllers/TaiKhoanKH.controller.js');
const router = express.Router();

const { addAccountKH, loginAccountKH } = TaiKhoanKHController;

router.post('/createAccountKH', addAccountKH);
router.post('/loginAccountKH', loginAccountKH);
module.exports = {
    routes: router,
};
