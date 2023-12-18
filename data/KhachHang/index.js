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
const getAllKhachHang = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const result = await pool.request().query(sqlQueries.allKH);

        return result.recordset;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getKhachHangById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const result = await pool.request().input('MaKH', sql.Int, id).query(sqlQueries.khachHangById);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};

const updateKhachHangByAdmin = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const result = await pool
            .request()
            .input('MaKH', sql.Int, data.MaKH)
            .input('TenKH', sql.NVarChar(100), data.TenKH)
            .input('SoDienThoai', sql.VarChar(15), data.SoDienThoai)
            .input('NgaySinh', sql.Date, data.NgaySinh)
            .input('GioiTinh', sql.NVarChar(10), data.GioiTinh)
            .input('DiaChi', sql.NVarChar(255), data.DiaChi)
            .query(sqlQueries.updateKhByAdmin);

        // Kiểm tra số hàng bị ảnh hưởng trong quá trình cập nhật
        if (result.rowsAffected[0] === 0) {
            throw new Error('Không có dữ liệu nào được cập nhật.');
        }

        return true;
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
        throw error;
    }
};

const deletedKH = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('KhachHang');
        const sqlQueries1 = await utils.loadSqlQueries('TaiKhoanKH');
        // Bước 1: Lấy thông tin khách hàng và tài khoản
        const khachHangResult = await pool.request().input('MaKH', sql.Int, id).query(sqlQueries.khachHangById);
        const khachHang = khachHangResult.recordset[0];

        if (!khachHang) {
            throw new Error('Không tìm thấy khách hàng.');
        }

        // Bước 2: Xóa khách hàng
        const khachHangDeleteResult = await pool.request().input('MaKH', sql.Int, id).query(sqlQueries.deleteKH);
        if (khachHangDeleteResult.rowsAffected[0] === 0) {
            throw new Error('Không thể xóa khách hàng.');
        }
        // Lấy mã tài khoản từ thông tin khách hàng
        const maTaiKhoan = khachHang.MaTKKH;

        // Bước 3: Xóa tài khoản
        const taiKhoanResult = await pool
            .request()
            .input('MaTKKH', sql.Int, maTaiKhoan)
            .query(sqlQueries1.deleteAccountKH);
        if (taiKhoanResult.rowsAffected[0] === 0) {
            throw new Error('Không thể xóa tài khoản.');
        }

        return true;
    } catch (error) {
        console.error('Lỗi khi xóa khách hàng', error);
        throw error;
    }
};
module.exports = { getDetailKH, updateKhachHang, getAllKhachHang, getKhachHangById, updateKhachHangByAdmin, deletedKH };
