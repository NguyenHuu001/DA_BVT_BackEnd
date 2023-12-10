INSERT INTO HuyVe (MaDatVe)
VALUES (@MaDatVe);

UPDATE LSDatVe
SET TrangThai = N'Đang Yêu Cầu Hủy'
WHERE MaDatVe = @MaDatVe;
