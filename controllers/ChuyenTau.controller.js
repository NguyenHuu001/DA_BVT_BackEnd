'use strict';
const ChuyenTauData = require('../data/ChuyenTau');
// /dish/:MaMonAn ->  const { MaMonAn } = req.params
//"http://example.com/?name=John&age=30 -> const name = req.query.name;
const getAllChuyenTau = async (req, res, next) => {
    try {
        const TaiKhoan = await ChuyenTauData.getAllChuyenTau();
        res.send(TaiKhoan);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const searchChuyenTau = async (req, res, next) => {
    try {
        const MaChuyenTau = req.query.MaChuyenTau;
        const SoLuong = req.query.SoLuong;
        const NgayDi = req.query.NgayDi;
        const ChuyenTau = await ChuyenTauData.searchChuyenTau(MaChuyenTau, SoLuong, NgayDi);
        res.send(ChuyenTau);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const searchPriceTicket = async (req, res, next) => {
    try {
        const MaChuyenTau = req.query.MaChuyenTau;

        const PriceTicket = await ChuyenTauData.searchPriceTicket(MaChuyenTau);
        res.send(PriceTicket);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = {
    getAllChuyenTau,
    searchChuyenTau,
    searchPriceTicket,
};
