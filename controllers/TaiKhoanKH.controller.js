'use strict';
const TaiKhoanKHData = require('../data/TaiKhoanKH');

const addAccountKH = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await TaiKhoanKHData.createAccountKH(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const loginAccountKH = async (req, res, next) => {
    try {
        const data = req.body;
        const login = await TaiKhoanKHData.loginKH(data);
        login ? res.send(login) : res.send('Sai tài khoản hoặc mật khẩu');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = {
    addAccountKH,
    loginAccountKH,
};
