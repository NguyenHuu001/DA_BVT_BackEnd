'use strict';
const ThongKeData = require('../data/ThongKe');
const TongTienThang = async (req, res, next) => {
    try {
        const data = await ThongKeData.TongTienThang();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const ThongKeVeBan_Huy = async (req, res, next) => {
    try {
        const data = await ThongKeData.ThongKeVeBan_Huy();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const saleTicketTrain = async (req, res, next) => {
    try {
        const data = await ThongKeData.saleTicketTrain();
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = {
    TongTienThang,
    ThongKeVeBan_Huy,
    saleTicketTrain,
};
