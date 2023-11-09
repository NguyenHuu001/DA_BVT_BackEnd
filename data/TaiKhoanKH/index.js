'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

module.exports = { createAccountKH, loginKH };
