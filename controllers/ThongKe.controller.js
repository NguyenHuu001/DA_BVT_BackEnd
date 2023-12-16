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

module.exports = {
    TongTienThang,
};
