
BEGIN TRANSACTION;

-- Thêm dữ liệu vào ChiTietChuyenTau và trả về MaCTCT
INSERT [dbo].[ChiTietChuyenTau] ( [MaChuyenTau], [NgayDi], [GioDi], [TinhTrang]) 
VALUES ( @MaChuyenTau, CAST(@NgayDi AS Date), CAST(@GioDi AS Time), N'Bình thường');
COMMIT;

