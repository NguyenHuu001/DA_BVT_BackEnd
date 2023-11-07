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
module.exports = { getAllChuyenTau,searchChuyenTau };
