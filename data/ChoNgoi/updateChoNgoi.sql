UPDATE ChiTietChoNgoi
SET MaKhachDiChung = @MaKhachDiChung, TrangThai = N'Đã đặt'
WHERE MaKhachDiChung IS NULL AND MaGhe = @MaGhe AND MaCTCT = @MaCTCT;
