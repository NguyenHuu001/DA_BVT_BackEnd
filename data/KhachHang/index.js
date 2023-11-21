'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getDetailKH = async (MaTKKH) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const result = await pool.request().input('MaTKKH', sql.Int, MaTKKH).query(sqlQueries.selectKH);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};
const updateKhachHang = async (dataKH, MaTKKH) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const sqlQueries1 = await utils.loadSqlQueries('TaiKhoanKH');
        const result = await pool
            .request()
            .input('TenKH', sql.NVarChar(100), dataKH.TenKH)
            .input('SoDienThoai', sql.VarChar(15), dataKH.SoDienThoai)
            .input('MaTKKH', sql.Int, MaTKKH)
            .query(sqlQueries.updateKhachHang);
        const result1 = await pool
            .request()
            .input('Email', sql.VarChar(100), dataKH.Email)
            .input('MaTKKH', sql.Int, MaTKKH)
            .query(sqlQueries1.updateEmailTK);
        return true;
    } catch (error) {
        throw error;
    }
};
module.exports = { getDetailKH, updateKhachHang };
