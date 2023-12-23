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
const selectDetailAllChuyenTau = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const result = await pool.request().query(sqlQueries.selectDetailAllChuyenTau);
        return result.recordset;
    } catch (error) {
        console.log(error.message); // In ra thông báo lỗi để xem làm thế nào
        throw error;
    }
};
const selectDetailChuyenTau = async (MaCTCT) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const result = await pool.request().input('MaCTCT', sql.Int, MaCTCT).query(sqlQueries.selectTrainByID);
        return result.recordset;
    } catch (error) {
        console.log(error.message); // In ra thông báo lỗi để xem làm thế nào
        throw error;
    }
};
const updateTrain = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const result = await pool
            .request()
            .input('MaCTCT', sql.Int, data.MaCTCT)
            .input('NgayDi', sql.NVarChar(50), data.NgayDi)
            .input('GioDi', sql.NVarChar(20), data.GioDi)
            .query(sqlQueries.updateTrain);
        return result.recordset;
    } catch (error) {
        console.log(error.message); // In ra thông báo lỗi để xem làm thế nào
        throw error;
    }
};
const deleteTrain = async (MaCTCT) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ChuyenTau');
        const result = await pool.request().input('MaCTCT', sql.Int, MaCTCT).query(sqlQueries.deleteTrain);
        return true;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};
module.exports = {
    getAllChuyenTau,
    searchChuyenTau,
    searchPriceTicket,
    addTrains,
    selectDetailAllChuyenTau,
    selectDetailChuyenTau,
    updateTrain,
    deleteTrain,
};
