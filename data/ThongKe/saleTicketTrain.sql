--Lệnh xem vé bán trong tháng cho từng chuyến tàu
SELECT 
    -- COALESCE(MONTH(ldv.NgayDatVe), MONTH(GETDATE())) AS Thang,
    ct.TenChuyen AS TenChuyenTau,
    COALESCE(COUNT(ldv.MaDatVe), 0) AS SoVeBanRa
FROM ChuyenTau ct
LEFT JOIN ChiTietChuyenTau ctt ON ct.MaChuyenTau = ctt.MaChuyenTau
LEFT JOIN LSDatVe ldv ON ctt.MaCTCT = ldv.MaCTCT AND ldv.MaTKKH IS NOT NULL
WHERE COALESCE(MONTH(ldv.NgayDatVe), MONTH(GETDATE())) = MONTH(GETDATE())
GROUP BY COALESCE(MONTH(ldv.NgayDatVe), MONTH(GETDATE())), ct.TenChuyen
ORDER BY COALESCE(MONTH(ldv.NgayDatVe), MONTH(GETDATE())), SoVeBanRa DESC;