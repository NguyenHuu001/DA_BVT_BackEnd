const jwt = require('jsonwebtoken');
const utils = require('../data/utils');
const config = require('../config');
const sql = require('mssql');
const checkAdmin = async (MaTKNV) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('TaiKhoanNV');
        const list = await pool.request().input('MaTKNV', sql.Int, MaTKNV).query(sqlQueries.checkAdmin);
        const Quyen = list.recordset[0];
        const qq = Quyen.Quyen;
        return qq;
    } catch (error) {
        return error.message;
    }
};
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'You are not authorized!' });
    }

    // Nếu token tồn tại, thực hiện xác minh token
    jwt.verify(token, 'mk', (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }

        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({ success: false, message: 'You are not authenticated' });
        }
    });
};

const verifyAdmin = async (req, res, next) => {
    await verifyToken(req, res, async () => {
        const admin = await checkAdmin(req.user.token);
        if (admin === 'NhanVien') {
            next();
        } else {
            res.status(401).json({ success: false, message: 'You are not authorized' });
        }
    });
};

module.exports = {
    verifyAdmin,
    verifyUser,
};
