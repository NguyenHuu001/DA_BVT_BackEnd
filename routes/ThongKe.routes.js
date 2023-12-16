'use strict';
const express = require('express');
const ThongKeController = require('../controllers/ThongKe.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const { TongTienThang } = ThongKeController;
const { verifyAdmin, verifyUser } = authenticate;
router.get('/tongTienThang', verifyAdmin, TongTienThang);
module.exports = {
    routes: router,
};
