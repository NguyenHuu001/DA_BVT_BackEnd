'use strict';
const ChuyenTauData = require('../data/ChoNgoi');
// /dish/:MaMonAn ->  const { MaMonAn } = req.params
//"http://example.com/?name=John&age=30 -> const name = req.query.name;
const getAllChoNgoi = async (req, res, next) => {
    try {
        const { MaCTCT } = req.params
        const data = await ChuyenTauData.getAllChoNgoi(MaCTCT);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getAllChoNgoi,
};
