'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getDetailKH = async (MaTKKH) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const result = await pool
            .request()
            .input('MaTKKH', sql.Int, MaTKKH)
            .query(sqlQueries.selectKH);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};

module.exports = { getDetailKH };
