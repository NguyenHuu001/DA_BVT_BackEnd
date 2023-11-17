INSERT INTO [dbo].[TTKhachDiChung] 
(
    [CMND],
    [HoTen],
    [NoiSinh],
    [NgaySinh],
    [DienThoai],
    [QuocTich],
    [Email],
    [MaTKKH]
)
VALUES (
    @CMND,
    @HoTen,
    @NoiSinh,
    @NgaySinh,
    @DienThoai,
    @QuocTich,
    @Email,
    @MaTKKH
);

SELECT SCOPE_IDENTITY() AS MaKhachDiChung;