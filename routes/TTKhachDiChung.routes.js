'use strict';
const express = require('express');
const TTKhachDiChung = require('../controllers/TTKhachDiChung.controller');
const router = express.Router();

const { createBookTicket } = TTKhachDiChung;

router.post('/createBookTicket', createBookTicket);
module.exports = {
    routes: router,
};
