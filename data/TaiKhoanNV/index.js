'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginAccountNV = async (TKNVData) => {
    try {
        let MatKhau = '',
            MaTKNV,
            TenDangNhap = TKNVData.TenDangNhap;
        let pool = await sql.connect(config.sql);
        //Lấy câu truy vấn
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanNV');
        //Thực hiện câu truy vấn
        const Admin = await pool
            .request()
            .input('TenDangNhap', sql.NVarChar(100), TKNVData.TenDangNhap)
            .query(sqlQueries.loginNV);
        if (Admin.recordset.length === 0) {
            return null;
        }
        Admin.recordset.map((value) => {
            MatKhau = value.MatKhau;
            MaTKNV = value.MaTKNV;
        });
        //Tạo token
        let token = jwt.sign({ token: MaTKNV }, 'mk');
        const hashedPassword = MatKhau;
        //So sánh password từ người dùng nhập vào và password trong cơ sở dữ liệu
        const passwordMatch = await bcrypt.compare(TKNVData.MatKhau, hashedPassword);
        const Quyen = Admin.recordset[0].Quyen;
        if (passwordMatch) {
            return { token, TenDangNhap, Quyen };
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    loginAccountNV,
};
