'use strict';
const TaiKhoanKHData = require('../data/TaiKhoanKH');
// /dish/:MaMonAn ->  const { MaMonAn } = req.params
//"http://example.com/?name=John&age=30 -> const name = req.query.name;
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
        login ? res.status(200).send(login) : res.status(400).send('Lỗi đăng nhập');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
module.exports = {
    addAccountKH,
    loginAccountKH,
};
