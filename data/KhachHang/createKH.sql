INSERT INTO [dbo].[KhachHang]
(
    [TenKH],
    [SoDienThoai],
    [NgaySinh],
    [GioiTinh],
    [DiaChi],
    [MaTKKH]
)
VALUES (
    @TenKH,
    @SoDienThoai,
    @NgaySinh,
    @GioiTinh,
    @DiaChi,
    @MaTKKH
);
