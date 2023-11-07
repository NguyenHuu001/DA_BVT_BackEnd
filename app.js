'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const TaiKhoanNVRoutes = require('./routes/TaiKhoanNV.routes');
const TaiKhoanKHRoutes = require('./routes/TaiKhoanKH.routes');
const ChuyenTauRroutes = require('./routes/ChuyenTau.routes');
app.use(cors());
app.use(bodyParser.json());
//routes
app.use('/api', TaiKhoanNVRoutes.routes);
app.use('/api', TaiKhoanKHRoutes.routes);
app.use('/api', ChuyenTauRroutes.routes);
//
app.listen(config.port, () => {
    console.log(`App running on port ${config.port} `);
});
