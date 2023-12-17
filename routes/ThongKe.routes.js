'use strict';
const express = require('express');
const ThongKeController = require('../controllers/ThongKe.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const { TongTienThang, ThongKeVeBan_Huy, saleTicketTrain } = ThongKeController;
const { verifyAdmin, verifyUser } = authenticate;
router.get('/tongTienThang', verifyAdmin, TongTienThang);
router.get('/thongKeVeBan_Huy', verifyAdmin, ThongKeVeBan_Huy);
router.get('/saleTicketTrain', verifyAdmin, saleTicketTrain);
module.exports = {
    routes: router,
};
