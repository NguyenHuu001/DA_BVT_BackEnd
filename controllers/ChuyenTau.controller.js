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
const addTrains = async (req, res, next) => {
    try {
        const data = req.body;
        const addTrains = await ChuyenTauData.addTrains(data);
        res.send(addTrains);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const selectDetailAllChuyenTau = async (req, res, next) => {
    try {
        const DetailTrains = await ChuyenTauData.selectDetailAllChuyenTau();
        res.send(DetailTrains);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const selectDetailChuyenTau = async (req, res, next) => {
    try {
        const { MaCTCT } = req.params;
        const DetailTrains = await ChuyenTauData.selectDetailChuyenTau(MaCTCT);
        res.send(DetailTrains);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const updateTrain = async (req, res, next) => {
    try {
        const data = req.body;
        const DetailTrains = await ChuyenTauData.updateTrain(data);
        res.send(DetailTrains);
    } catch (error) {
        res.status(400).send(error.message);
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
};
