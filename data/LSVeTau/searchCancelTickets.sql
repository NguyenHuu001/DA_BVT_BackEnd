SELECT
    LSDV.MaDatVe,
    CT.TenChuyen,
    CTT.NgayDi,
    CTT.GioDi,
    LSDV.NgayDatVe,
    LSDV.MaCTCT,
    LSDV.MaKhachDiChung,
    LSDV.TrangThai,
    LSDV.GiaVe,
    TTKDC.HoTen AS HoTenKhachDiChung,
    CN.SoGhe AS TenGhe,
    CTCN.MaGhe
FROM
    LSDatVe LSDV
JOIN HuyVe HV ON LSDV.MaDatVe = HV.MaDatVe
JOIN ChiTietChuyenTau CTT ON LSDV.MaCTCT = CTT.MaCTCT
JOIN ChuyenTau CT ON CTT.MaChuyenTau = CT.MaChuyenTau
LEFT JOIN TTKhachDiChung TTKDC ON LSDV.MaKhachDiChung = TTKDC.MaKhachDiChung
LEFT JOIN ChiTietChoNgoi CTCN ON LSDV.MaCTCT = CTCN.MaCTCT AND LSDV.MaKhachDiChung = CTCN.MaKhachDiChung
LEFT JOIN ChoNgoi CN ON CTCN.MaGhe = CN.MaGhe
WHERE
    HV.MaDatVe = @MaDatVe;