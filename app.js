'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const TaiKhoanNVRoutes = require('./routes/TaiKhoanNV.routes');
const TaiKhoanKHRoutes = require('./routes/TaiKhoanKH.routes');
const ChuyenTauRoutes = require('./routes/ChuyenTau.routes');
const KhachHangRoutes = require('./routes/KhachHang.routes');
//cấu hình để sử dụng cookies
app.use(
    cors({
        origin: 'http://localhost:3009',
        credentials: true,
    }),
);
app.use(cookieParser());
//cấu hình để sử dụng req.body
app.use(bodyParser.json());
//routes
app.use('/api', TaiKhoanNVRoutes.routes);
app.use('/api', TaiKhoanKHRoutes.routes);
app.use('/api', ChuyenTauRoutes.routes);
app.use('/api', KhachHangRoutes.routes);
//
app.listen(config.port, () => {
    console.log(`App running on port ${config.port} `);
});
