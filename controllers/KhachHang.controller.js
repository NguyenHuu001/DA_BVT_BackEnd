'use strict';
const KhachHangData = require('../data/KhachHang');
const jwt = require('jsonwebtoken');
const getDetailKH = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const idUser = jwt.verify(token, 'mk');
        const MaTKKH = idUser.token;

        // const { MaTKKH } = req.params;
        const KhachHang = await KhachHangData.getDetailKH(MaTKKH);
        res.send(KhachHang);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const updateKhachHang = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const idUser = jwt.verify(token, 'mk');
        const MaTKKH = idUser.token;

        const dataKH = req.body;
        const KhachHang = await KhachHangData.updateKhachHang(dataKH, MaTKKH);
        res.status(200).send(KhachHang);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getAllKhachHang = async (req, res, next) => {
    try {
        const KhachHangList = await KhachHangData.getAllKhachHang();
        res.send(KhachHangList);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getKhachHangById = async (req, res, next) => {
    const makh = req.params.id;
    try {
        const khachHangDetail = await KhachHangData.getKhachHangById(makh);
        res.send(khachHangDetail);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

const updateKhachHangByAdmin = async (req, res, next) => {
    const data = req.body;
    try {
        const updatedKH = await KhachHangData.updateKhachHangByAdmin(data);
        if (updatedKH) {
            res.status(200).send({ message: 'Cập nhật thông tin khách hàng thành công!' });
        } else {
            res.send({ message: 'Có lỗi xảy ra khi cập nhật thông tin khách hàng.' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

const deleteKhachHang = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedKH = await KhachHangData.deletedKH(id);
        if (deletedKH) {
            res.status(200).send({ message: 'Xóa khách hàng thành công!' });
        } else {
            res.send({ message: 'Có lỗi xảy ra khi xóa khách hàng.' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

module.exports = {
    getDetailKH,
    updateKhachHang,
    getAllKhachHang,
    getKhachHangById,
    updateKhachHangByAdmin,
    deleteKhachHang,
};
