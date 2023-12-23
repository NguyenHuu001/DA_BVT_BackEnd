'use strict';
const express = require('express');
const ChuyenTauController = require('../controllers/ChuyenTau.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const {
    getAllChuyenTau,
    searchChuyenTau,
    searchPriceTicket,
    addTrains,
    selectDetailAllChuyenTau,
    selectDetailChuyenTau,
    updateTrain,
    deleteTrain,
} = ChuyenTauController;
const { verifyAdmin, verifyUser } = authenticate;
router.get('/getAllChuyenTau', getAllChuyenTau);
router.get('/searchChuyenTau', searchChuyenTau);
router.get('/searchPriceTicket', searchPriceTicket);
router.get('/selectDetailAllChuyenTau', verifyAdmin, selectDetailAllChuyenTau);
router.get('/selectDetailChuyenTau/:MaCTCT', verifyAdmin, selectDetailChuyenTau);
router.post('/addTrains', verifyAdmin, addTrains);
router.put('/updateTrain', verifyAdmin, updateTrain);
router.delete('/deleteTrain/:MaCTCT', verifyAdmin, deleteTrain);
module.exports = {
    routes: router,
};
