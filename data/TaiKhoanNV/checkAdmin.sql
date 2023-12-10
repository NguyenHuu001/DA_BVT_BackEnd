SELECT 
    MaTKNV,
    TenDangNhap,
    Email,
    Quyen,
    MatKhau
FROM 
    TaiKhoanNV
WHERE 
    MaTKNV = @MaTKNV;