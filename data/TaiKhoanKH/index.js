'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const createAccountKH = async (TKKHData) => {
    try {
        let pool = await sql.connect(config.sql);
        //Băm Password
        const hashedPassword = await bcrypt.hash(TKKHData.MatKhau, 10);
        //Lấy câu truy vấn
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const sqlQueries1 = await utils.loadSqlQueries('KhachHang');
        //Thêm Tài khoản khách hàng
        const insertTKKH = await pool
            .request()
            .input('TenDangNhap', sql.VarChar(50), TKKHData.TenDangNhap)
            .input('Email', sql.VarChar(100), TKKHData.Email)
            .input('MatKhau', sql.VarChar(100), hashedPassword)
            .query(sqlQueries.createTKKH);

        let MaTKKH = '';
        insertTKKH.recordset.map((item) => {
            MaTKKH = item.IDTTKH;
        });

        // Chèn thông tin khách hàng vào bảng KhachHang và liên kết với MaTKKH
        const insertKhachHang = await pool
            .request()
            .input('TenKH', sql.NVarChar(100), TKKHData.TenKH || null)
            .input('SoDienThoai', sql.VarChar(15), TKKHData.SoDienThoai || null)
            .input('NgaySinh', sql.Date, TKKHData.NgaySinh || null)
            .input('GioiTinh', sql.NVarChar(10), TKKHData.GioiTinh || null)
            .input('DiaChi', sql.NVarChar(255), TKKHData.DiaChi || null)
            .input('MaTKKH', sql.Int, MaTKKH)
            .query(sqlQueries1.createKH);

        return insertTKKH.recordset;
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const loginKH = async (TKKHData) => {
    try {
        let MatKhau = '',
            MaTKKH,
            DataKH = [];
        let pool = await sql.connect(config.sql);
        //Lấy câu truy vấn
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const sqlQueries1 = await utils.loadSqlQueries('KhachHang');
        //Thực hiện câu truy vấn
        const user = await pool
            .request()
            .input('TenDangNhap', sql.NVarChar(100), TKKHData.TenDangNhap)
            .query(sqlQueries.loginKH);
        if (user.recordset.length === 0) {
            return null;
        }
        user.recordset.map((value) => {
            MatKhau = value.MatKhau;
            MaTKKH = value.MaTKKH;
        });
        //Thực hiện câu truy vấn
        const detailUser = await pool.request().input('MaTKKH', sql.Int, MaTKKH).query(sqlQueries1.selectKH);
        DataKH = detailUser.recordset;
        //Tạo token
        let token = jwt.sign({ token: MaTKKH }, 'mk');
        const hashedPassword = MatKhau;
        //So sánh password từ người dùng nhập vào và password trong cơ sở dữ liệu
        const passwordMatch = await bcrypt.compare(TKKHData.MatKhau, hashedPassword);
        if (passwordMatch) {
            return { token, DataKH };
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const forgotPassWord = async (Email) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const checkEmail = await pool.request().input('Email', sql.VarChar(100), Email).query(sqlQueries.checkEmail);

        if (checkEmail.recordset.length === 0) {
            return { message: 'Email không tồn tại trong hệ thống.' };
        }

        const MaTKKH = checkEmail.recordset[0].MaTKKH;
        const secret = checkEmail.recordset[0].Email;

        const token = jwt.sign({ MaTKKH: MaTKKH, Email: secret }, secret, { expiresIn: '5m' });
        const link = `http://localhost:8008/api/reset-password/${MaTKKH}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nguyenduchuu1k1@gmail.com',
                pass: 'evqk vkbd ijlh hegu',
            },
        });
        console.log(Email);
        var mailOptions = {
            from: 'nguyenduchuu1k1@gmail.com',
            to: Email,
            subject: 'Thay đổi mật khẩu của "Bán vé tàu hỏa siêu cấp vippro"',
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return { message: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.', link };
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const resetPassWord = async (id, token) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const checkAccount = await pool.request().input('MaTKKT', sql.Int, id).query(sqlQueries.checkAccount);
        if (!checkAccount) return null;
        const secret = checkAccount.recordset[0].Email;
        const verify = jwt.verify(token, secret);
        return verify;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
const postResetPassWord = async (id, token, password) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const checkAccount = await pool.request().input('MaTKKT', sql.Int, id).query(sqlQueries.checkAccount);
        if (!checkAccount) return null;
        const secret = checkAccount.recordset[0].Email;
        const verify = jwt.verify(token, secret);
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertTKKH = await pool
            .request()
            .input('MatKhau', sql.VarChar(100), hashedPassword)
            .input('Email', sql.VarChar(100), verify.Email)
            .input('MaTKKH', sql.Int, verify.MaTKKH)
            .query(sqlQueries.updatePassWord);
        return 'Cập nhật thành công';
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
module.exports = { createAccountKH, loginKH, forgotPassWord, resetPassWord, postResetPassWord };
