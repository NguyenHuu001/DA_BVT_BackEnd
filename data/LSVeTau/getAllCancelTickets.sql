SELECT
    HV.MaHuyVe,
    LSDV.MaDatVe,
    CT.TenChuyen,
    CTT.NgayDi,
    CTT.GioDi,
    LSDV.NgayDatVe,
    LSDV.MaCTCT,
    LSDV.MaKhachDiChung,
    LSDV.TrangThai,
    LSDV.GiaVe,
    HV.TenTaiKhoan,
    HV.SoTaiKhoan,
    HV.TenNganHang,
    TTKDC.HoTen AS HoTenKhachDiChung
FROM
    HuyVe HV
JOIN LSDatVe LSDV ON HV.MaDatVe = LSDV.MaDatVe
JOIN ChiTietChuyenTau CTT ON LSDV.MaCTCT = CTT.MaCTCT
JOIN ChuyenTau CT ON CTT.MaChuyenTau = CT.MaChuyenTau
LEFT JOIN TTKhachDiChung TTKDC ON LSDV.MaKhachDiChung = TTKDC.MaKhachDiChung
LEFT JOIN ChiTietChoNgoi CTCN ON LSDV.MaCTCT = CTCN.MaCTCT AND LSDV.MaKhachDiChung = CTCN.MaKhachDiChung
LEFT JOIN ChoNgoi CN ON CTCN.MaGhe = CN.MaGhe;
