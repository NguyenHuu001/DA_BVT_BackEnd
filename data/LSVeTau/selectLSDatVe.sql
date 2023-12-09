SELECT
    ChuyenTau.TenChuyen,
    ChiTietChuyenTau.NgayDi,
    ChiTietChuyenTau.GioDi,
    LSDatVe.NgayDatVe,
    SUM(LSDatVe.TongTien) AS TongTien,
    COUNT(TTKhachDiChung.MaKhachDiChung) AS SoLuongKhachDiChung
FROM
    LSDatVe
INNER JOIN ChiTietChuyenTau ON LSDatVe.MaCTCT = ChiTietChuyenTau.MaCTCT
INNER JOIN ChuyenTau ON ChiTietChuyenTau.MaChuyenTau = ChuyenTau.MaChuyenTau
LEFT JOIN TTKhachDiChung ON LSDatVe.MaKhachDiChung = TTKhachDiChung.MaKhachDiChung
WHERE
    LSDatVe.MaTKKH = @MaTKKH
GROUP BY
    ChuyenTau.TenChuyen,
    ChiTietChuyenTau.NgayDi,
    ChiTietChuyenTau.GioDi,
    LSDatVe.NgayDatVe;
