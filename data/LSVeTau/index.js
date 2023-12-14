'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getLSDatVe = async (MaTKKH) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LSVeTau');
        const list = await pool.request().input('MaTKKH', sql.Int, MaTKKH).query(sqlQueries.selectLSDatVe);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
};
const cancelTickets = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LSVeTau');
        const list = await pool
            .request()
            .input('MaDatVe', sql.Int, data.MaDatVe)
            .input('TenTaiKhoan', sql.NVarChar(50), data.TenTaiKhoan)
            .input('SoTaiKhoan', sql.NVarChar(50), data.SoTaiKhoan)
            .input('TenNganHang', sql.NVarChar(150), data.TenNganHang)
            .query(sqlQueries.cancelTickets);
        return true;
    } catch (error) {
        return error.message;
    }
};
const searchCancelTickets = async (MaDatVe) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('LSVeTau');
        const list = await pool.request().input('MaDatVe', sql.Int, MaDatVe).query(sqlQueries.searchCancelTickets);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
};
module.exports = { getLSDatVe, cancelTickets, searchCancelTickets };
