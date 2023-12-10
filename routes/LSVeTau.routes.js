'use strict';
const express = require('express');
const LSVeTauController = require('../controllers/LSVeTau.controller.js');
const authenticate = require('../utils/authenticate.js');
const router = express.Router();

const { getLSDatVe, cancelTickets, searchCancelTickets } = LSVeTauController;
const { verifyAdmin, verifyUser } = authenticate;

router.get('/getLSDatVe', getLSDatVe);
router.get('/searchCancelTickets/:MaDatVe', verifyAdmin, searchCancelTickets);
router.post('/cancelTickets/:MaDatVe', cancelTickets);
module.exports = {
    routes: router,
};
