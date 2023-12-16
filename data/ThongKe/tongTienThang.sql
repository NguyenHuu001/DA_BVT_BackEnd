SELECT 
    SUM(GiaVe) AS TongThuNhapThang
FROM LSDatVe
WHERE MONTH(NgayDatVe) = MONTH(GETDATE());                      