UPDATE KhachHang
SET 
    TenKH = @TenKH, 
    SoDienThoai = @SoDienThoai
WHERE MaTKKH = @MaTKKH;
