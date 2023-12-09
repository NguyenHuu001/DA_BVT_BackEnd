'use strict';
const TaiKhoanNVData = require('../data/TaiKhoanNV');

const loginAccountNV = async (req, res, next) => {
    try {
        const data = req.body;
        const login = await TaiKhoanNVData.loginAccountNV(data);
        login ? res.status(200).send(login) : res.status(400).send('Đăng nhập thất bại');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
module.exports = {
    loginAccountNV,
};
