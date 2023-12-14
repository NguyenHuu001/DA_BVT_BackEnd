INSERT INTO HuyVe (MaDatVe,TenTaiKhoan,SoTaiKhoan,TenNganHang)
VALUES (@MaDatVe,@TenTaiKhoan,@SoTaiKhoan,@TenNganHang);

UPDATE LSDatVe
SET TrangThai = N'Đang Yêu Cầu Hủy'
WHERE MaDatVe = @MaDatVe;
