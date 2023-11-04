INSERT INTO [dbo].[TaiKhoanKH] 
(
    [TenDangNhap],
    [Email],
    [MatKhau]
)
VALUES (
    @TenDangNhap,
    @Email,
    @MatKhau
)
SELECT SCOPE_IDENTITY() AS IDTTKH
