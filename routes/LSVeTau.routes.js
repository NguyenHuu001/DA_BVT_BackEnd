'use strict';
const express = require('express');
const LSVeTauController = require('../controllers/LSVeTau.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const { getLSDatVe, cancelTickets, searchCancelTickets, getAllCancelTickets, confimCancelTicket } = LSVeTauController;
const { verifyAdmin, verifyUser } = authenticate;

router.get('/getLSDatVe', getLSDatVe);
router.get('/searchCancelTickets/:MaDatVe', verifyAdmin, searchCancelTickets);
router.get('/getAllCancelTickets', verifyAdmin, getAllCancelTickets);
router.post('/cancelTickets/', cancelTickets);
router.post('/confimCancelTicket/', verifyAdmin, confimCancelTicket);
module.exports = {
    routes: router,
};
