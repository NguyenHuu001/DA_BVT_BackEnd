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
        console.log(data);
        const login = await TaiKhoanKHData.loginKH(data);
        login ? res.status(200).send(login) : res.status(400).send('Lỗi đăng nhập');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
module.exports = {
    addAccountKH,
    loginAccountKH,
};
