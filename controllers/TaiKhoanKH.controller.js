'use strict';
const { verify } = require('jsonwebtoken');
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
const forgotPassWord = async (req, res, next) => {
    try {
        const { Email } = req.body;
        const forgot = await TaiKhoanKHData.forgotPassWord(Email);
        forgot ? res.status(200).send(forgot) : res.status(400).send('Lỗi check Mail');
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const resetPassWord = async (req, res, next) => {
    try {
        const { id, token } = req.params;
        const reset = await TaiKhoanKHData.resetPassWord(id, token);
        reset
            ? res.render('../views/resetPassWord', { Email: reset.Email, status: 'lỗi' })
            : res.status(400).send('Lỗi reset pass');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
const postResetPassWord = async (req, res, next) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;
        const reset = await TaiKhoanKHData.postResetPassWord(id, token, password);
        reset
            ? res.render('../views/resetPassWord', { Email: reset.Email, status: 'verified' })
            : res.status(400).send('Lỗi reset pass');
    } catch (error) {
        res.status(401).send(error.message);
    }
};
module.exports = {
    addAccountKH,
    loginAccountKH,
    forgotPassWord,
    resetPassWord,
    postResetPassWord,
};
