'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const createAccountKH = async (TKKHData) => {
    try {
        let pool = await sql.connect(config.sql);
        const hashedPassword = await bcrypt.hash(TKKHData.MatKhau, 10);

        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const sqlQueries1 = await utils.loadSqlQueries('KhachHang');
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
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const user = await pool
            .request()
            .input('TenDangNhap', sql.NVarChar(100), TKKHData.TenDangNhap)
            .query(sqlQueries.loginKH);
        if (user.recordset.length === 0) {
            return null;
        }
        console.log(TKKHData);
        let MatKhau ='';
        let MaTKKH;
        user.recordset.map(value => {
            MatKhau = value.MatKhau;
            MaTKKH = value.MaTKKH;
        })
        let token = jwt.sign({ token: MaTKKH }, "mk");
        const idUser = jwt.verify(token, "mk");
        const hashedPassword = MatKhau;
        const passwordMatch = await bcrypt.compare(TKKHData.MatKhau, hashedPassword);
        if (passwordMatch) {
            return {token}; 
        } else {
            return null; 
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { createAccountKH, loginKH };
