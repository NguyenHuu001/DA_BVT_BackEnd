'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getAllChuyenTau = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const list = await pool.request().query(sqlQueries.selectChuyenTau);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
};
const searchChuyenTau = async (MaChuyenTau, SoLuong, NgayDi) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const result = await pool
            .request()
            .input('MaChuyenTau', sql.Int, MaChuyenTau)
            .input('SoLuong', sql.Int, SoLuong)
            .input('NgayDi', sql.Date, NgayDi)
            .query(sqlQueries.searchChuyenTau);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};
const searchPriceTicket = async (MaChuyenTau, MaGhe) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const result = await pool.request().input('MaChuyenTau', sql.Int, MaChuyenTau).query(sqlQueries.priceTicket);
        return result.recordset;
    } catch (error) {
        throw error;
    }
};

const addTrains = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        console.log(data.GioDi);
        const result = await pool
            .request()
            .input('MaChuyenTau', sql.Int, data.MaChuyenTau)
            .input('NgayDi', sql.Date, data.NgayDi)
            .input('GioDi', sql.NVarChar(10), data.GioDi)
            .query(sqlQueries.addChuyenTau);
        return result.recordset;
    } catch (error) {
        console.log(error.message); // In ra thông báo lỗi để xem làm thế nào
        throw error;
    }
};
module.exports = { getAllChuyenTau, searchChuyenTau, searchPriceTicket, addTrains };
