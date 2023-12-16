'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const TongTienThang = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ThongKe');
        const total = await pool.request().query(sqlQueries.tongTienThang);
        const numberCancel = await pool.request().query(sqlQueries.numberCanceTickets);
        const numberTickets = await pool.request().query(sqlQueries.numberTickets);
        const combinedResult = { ...total.recordset[0], ...numberCancel.recordset[0], ...numberTickets.recordset[0] };
        return combinedResult;
    } catch (error) {
        return error.message;
    }
};

module.exports = { TongTienThang };
