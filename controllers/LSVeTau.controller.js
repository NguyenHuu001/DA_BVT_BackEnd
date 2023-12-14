'use strict';
const LSVeTauData = require('../data/LSVeTau');
const jwt = require('jsonwebtoken');

const getLSDatVe = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const idUser = jwt.verify(token, 'mk');
        const MaTKKH = idUser.token;
        const response = await LSVeTauData.getLSDatVe(MaTKKH);
        response ? res.status(200).send(response) : res.status(400).send('Lấy Thông tin thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
const cancelTickets = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await LSVeTauData.cancelTickets(data);
        response ? res.status(200).send(response) : res.status(400).send('Hủy vé thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const searchCancelTickets = async (req, res, next) => {
    try {
        const { MaDatVe } = req.params;
        const response = await LSVeTauData.searchCancelTickets(MaDatVe);
        response ? res.status(200).send(response) : res.status(400).send('Hủy vé thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
const getAllCancelTickets = async (req, res, next) => {
    try {
        const response = await LSVeTauData.getAllCancelTickets();
        response ? res.status(200).send(response) : res.status(400).send('Hủy vé thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
const confimCancelTicket = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await LSVeTauData.confimCancelTicket(data);
        response ? res.status(200).send(response) : res.status(400).send('Hủy vé thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
module.exports = {
    getLSDatVe,
    cancelTickets,
    searchCancelTickets,
    getAllCancelTickets,
    confimCancelTicket,
};
