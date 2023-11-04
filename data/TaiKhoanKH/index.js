'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const createAccountKH = async (TKKHData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanKH');
        const sqlQueries1 = await utils.loadSqlQueries('KhachHang');
        const insertTKKH = await pool
            .request()
            .input('TenDangNhap', sql.VarChar(50), TKKHData.TenDangNhap)
            .input('Email', sql.VarChar(100), TKKHData.Email)
            .input('MatKhau', sql.VarChar(100), TKKHData.MatKhau)
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
        const result = await pool
            .request()
            .input('TenDangNhap', sql.NVarChar(100), TKKHData.TenDangNhap)
            .input('MatKhau', sql.NVarChar(100), TKKHData.MatKhau)
            .query(sqlQueries.loginKH);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};

module.exports = { createAccountKH, loginKH };
