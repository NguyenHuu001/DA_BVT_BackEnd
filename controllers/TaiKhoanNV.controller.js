'use strict';
const TaiKhoanKHData = require('../data/TaiKhoanNV');

const getAllTaiKhoanNV = async (req, res, next) => {
    try {
        const TaiKhoan = await TaiKhoanKHData.getTaiKhoanNV();
        res.send(TaiKhoan);
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    getAllTaiKhoanNV
}