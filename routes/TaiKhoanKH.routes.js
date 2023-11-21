'use strict';
const express = require('express');
const TaiKhoanKHController = require('../controllers/TaiKhoanKH.controller.js');
const router = express.Router();

const { addAccountKH, loginAccountKH, forgotPassWord, resetPassWord,postResetPassWord } = TaiKhoanKHController;

router.post('/createAccountKH', addAccountKH);
router.post('/loginAccountKH', loginAccountKH);
router.post('/forgotPassWord', forgotPassWord);
router.get('/reset-password/:id/:token', resetPassWord);
router.post('/reset-password/:id/:token', postResetPassWord);
module.exports = {
    routes: router,
};
