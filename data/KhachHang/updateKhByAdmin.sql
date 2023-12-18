-- KhachHang.sql
UPDATE KhachHang
SET
    TenKH = @TenKH,
    SoDienThoai = @SoDienThoai,
    NgaySinh = @NgaySinh,
    GioiTinh = @GioiTinh,
    DiaChi = @DiaChi
WHERE
    MaKH = @MaKH;
