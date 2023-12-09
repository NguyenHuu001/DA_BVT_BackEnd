'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const createBookTicket = async (dataArray, MaTKKH, dataLSDV) => {
    try {
        let pool = await sql.connect(config.sql);
        const maKhachDiChungArray = [];
        const sqlQueries = await utils.loadSqlQueries('TTKhachDiChung');
        const sqlQueries1 = await utils.loadSqlQueries('ChoNgoi');
        if (!MaTKKH) return null;
        for (let i = 0; i < dataArray.length; i++) {
            const data = dataArray[i];
            const result = await pool
                .request()
                .input('CMND', sql.NVarChar(20), data.CMNDHK || null)
                .input('HoTen', sql.NVarChar(100), data.HoTenHK || null)
                .input('NoiSinh', sql.NVarChar(255), data.NoiSinhHK || null)
                .input('NgaySinh', sql.Date, data.NgaySinhHK || null)
                .input('DienThoai', sql.NVarChar(15), data.SDTHK || null)
                .input('QuocTich', sql.NVarChar(50), data.QuocTichHK || null)
                .input('Email', sql.NVarChar(100), data.EmailHK || null)
                .input('MaTKKH', sql.Int, MaTKKH)
                .query(sqlQueries.createKhachDiChung);

            const maKhachDiChung = result.recordset[0].MaKhachDiChung;
            maKhachDiChungArray.push(maKhachDiChung);

            await pool
                .request()
                .input('MaKhachDiChung', sql.Int, result.recordset[0].MaKhachDiChung || null)
                .input('MaGhe', sql.Int, data.MaGhe || null)
                .input('MaCTCT', sql.Int, dataLSDV.MaCTCT || null)
                .query(sqlQueries1.updateChoNgoi);
        }
        for (let i = 0; i < maKhachDiChungArray.length; i++) {
            const maKhachDiChung = maKhachDiChungArray[i];
            const result = await pool
                .request()
                .input('MaTKKH', sql.Int, MaTKKH)
                .input('MaCTCT', sql.Int, dataLSDV.MaCTCT || null)
                .input('NgayDatVe', sql.Date, dataLSDV.NgayDatVe || null)
                .input('MaKhachDiChung', sql.Int, maKhachDiChung || null)
                .input('TongTien', sql.Decimal(10, 2), i === 0 ? dataLSDV.TongTien : null)
                .query(sqlQueries.createLSDatVe);
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
module.exports = {
    createBookTicket,
};
