'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
//Lấy tất cả chỗ ngồi với điều kiện MaCTCT
const getAllChoNgoi = async (MaCTCT) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChoNgoi');
        const list = await pool.request().input('MaCTCT', sql.Int, MaCTCT).query(sqlQueries.selectChoNgoi);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
};

module.exports = { getAllChoNgoi };
