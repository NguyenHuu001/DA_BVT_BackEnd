SELECT KH.[TenKH], KH.[SoDienThoai], KH.[NgaySinh], KH.[GioiTinh], KH.[DiaChi], TK.[Email]
FROM [dbo].[KhachHang] KH
INNER JOIN [dbo].[TaiKhoanKH] TK ON KH.[MaTKKH] = TK.[MaTKKH]
WHERE KH.[MaTKKH] = @MaTKKH;