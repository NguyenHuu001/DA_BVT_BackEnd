'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
//Sử dụng Cookie
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//Thư viện gửi Mail

const app = express();
//Folder Routes
const TaiKhoanNVRoutes = require('./routes/TaiKhoanNV.routes');
const TaiKhoanKHRoutes = require('./routes/TaiKhoanKH.routes');
const ChuyenTauRoutes = require('./routes/ChuyenTau.routes');
const KhachHangRoutes = require('./routes/KhachHang.routes');
const ChoNgoiRoutes = require('./routes/ChoNgoi.routes');
const TTKhachDiChung = require('./routes/TTKhachDiChung.routes');
const LSVeTau = require('./routes/LSVeTau.routes');
//cấu hình để sử dụng cookies
app.use(
    cors({
        origin: 'http://localhost:3009',
        credentials: true,
    }),
);
app.use(cookieParser());
//Sử dụng file resetPassWord trong file views
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
//cấu hình để sử dụng req.body
app.use(bodyParser.json());
//routes
app.use('/api', TaiKhoanNVRoutes.routes);
app.use('/api', TaiKhoanKHRoutes.routes);
app.use('/api', ChuyenTauRoutes.routes);
app.use('/api', KhachHangRoutes.routes);
app.use('/api', ChoNgoiRoutes.routes);
app.use('/api', TTKhachDiChung.routes);
app.use('/api', LSVeTau.routes);
//

app.listen(config.port, () => {
    console.log(`App running on port ${config.port} `);
});
