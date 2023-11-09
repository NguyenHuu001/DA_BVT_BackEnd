'use strict';
const KhachHangData = require('../data/KhachHang');
const jwt = require('jsonwebtoken');
const getDetailKH = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const idUser = jwt.verify(token, 'mk');
        const MaTKKH = idUser.token;

        // const { MaTKKH } = req.params;
        const KhachHang = await KhachHangData.getDetailKH(MaTKKH);
        res.send(KhachHang);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = { getDetailKH };
