'use strict';
const TTKhachDiChung = require('../data/TTKhachDiChung');
const jwt = require('jsonwebtoken');
const createBookTicket = async (req, res, next) => {
    try {
        const { DetailListHK, dataLSDV } = req.body;
        const token = req.cookies.token;
        const idUser = jwt.verify(token, 'mk');
        const MaTKKH = idUser.token;
        const KhachHang = await TTKhachDiChung.createBookTicket(DetailListHK, MaTKKH, dataLSDV);
        res.status(200).send(KhachHang);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = { createBookTicket };
