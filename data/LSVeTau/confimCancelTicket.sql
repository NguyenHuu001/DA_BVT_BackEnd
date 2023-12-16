BEGIN TRANSACTION;

DELETE FROM HuyVe WHERE MaHuyVe = @MaHuyVe;

UPDATE LSDatVe
SET MaTKKH = NULL, GiaVe = GiaVe * 0.2, TrangThai = N'Đã hủy'
WHERE MaDatVe = @MaDatVe ;

UPDATE ChiTietChoNgoi
SET TrangThai = 'Trống', MaKhachDiChung = NULL
WHERE MaCTCT = @MaCTCT AND MaKhachDiChung = @MaKhachDiChung; 
    
COMMIT;