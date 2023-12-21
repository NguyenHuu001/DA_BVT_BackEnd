'use strict';
const express = require('express');
const TaiKhoanKHController = require('../controllers/ChuyenTau.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const { getAllChuyenTau, searchChuyenTau, searchPriceTicket, addTrains, selectDetailChuyenTau } = TaiKhoanKHController;
const { verifyAdmin, verifyUser } = authenticate;
router.get('/getAllChuyenTau', getAllChuyenTau);
router.get('/searchChuyenTau', searchChuyenTau);
router.get('/searchPriceTicket', searchPriceTicket);
router.get('/selectDetailTrains', verifyAdmin, selectDetailChuyenTau);
router.post('/addTrains', verifyAdmin, addTrains);
module.exports = {
    routes: router,
};
