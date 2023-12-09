'use strict';
const TaiKhoanNVData = require('../data/LSVeTau');
const jwt = require('jsonwebtoken');

const getLSDatVe = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const idUser = jwt.verify(token, 'mk');
        const MaTKKH = idUser.token;
        const login = await TaiKhoanNVData.getLSDatVe(MaTKKH);
        login ? res.status(200).send(login) : res.status(400).send('Lấy Thông tin thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
module.exports = {
    getLSDatVe,
};
