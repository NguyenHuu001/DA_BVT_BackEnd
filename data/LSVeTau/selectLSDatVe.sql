SELECT
    LSDatVe.MaDatVe,
    ChuyenTau.TenChuyen,
    ChiTietChuyenTau.NgayDi,
    ChiTietChuyenTau.GioDi,
    LSDatVe.NgayDatVe,
    LSDatVe.MaCTCT,
    LSDatVe.MaKhachDiChung,
    LSDatVe.TrangThai,
    LSDatVe.GiaVe,
    TTKhachDiChung.HoTen AS HoTenKhachDiChung,
    ChoNgoi.SoGhe AS TenGhe,
    ChiTietChoNgoi.MaGhe
FROM
    LSDatVe
INNER JOIN ChiTietChuyenTau ON LSDatVe.MaCTCT = ChiTietChuyenTau.MaCTCT
INNER JOIN ChuyenTau ON ChiTietChuyenTau.MaChuyenTau = ChuyenTau.MaChuyenTau
LEFT JOIN TTKhachDiChung ON LSDatVe.MaKhachDiChung = TTKhachDiChung.MaKhachDiChung
LEFT JOIN ChiTietChoNgoi ON LSDatVe.MaCTCT = ChiTietChoNgoi.MaCTCT AND LSDatVe.MaKhachDiChung = ChiTietChoNgoi.MaKhachDiChung
LEFT JOIN ChoNgoi ON ChiTietChoNgoi.MaGhe = ChoNgoi.MaGhe
WHERE
    LSDatVe.MaTKKH = @MaTKKH
ORDER BY
    LSDatVe.MaDatVe DESC; 

-- GROUP BY
--     ChuyenTau.TenChuyen,
--     ChiTietChuyenTau.NgayDi,
--     LSDatVe.TrangThai,
--     ChiTietChuyenTau.GioDi,
--     LSDatVe.MaDatVe,
--     LSDatVe.NgayDatVe,
--     LSDatVe.GiaVe,
--     TTKhachDiChung.HoTen;
