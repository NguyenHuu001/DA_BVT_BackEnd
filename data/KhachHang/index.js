'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


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

module.exports = {  };
