SELECT
    [CT].[NgayDi],
    [CT].[GioDi],
    [CT].[TinhTrang],
    [C].[MaChuyenTau],
    [C].[TenChuyen],
    COUNT([CN].[TrangThai]) AS [SoGheTrong]
FROM [ChuyenTau] [C]
INNER JOIN [ChiTietChuyenTau] [CT]
    ON [C].[MaChuyenTau] = [CT].[MaChuyenTau]
LEFT JOIN [ChiTietChoNgoi] [CN]
    ON [CT].[MaCTCT] = [CN].[MaCTCT]
WHERE [C].[MaChuyenTau] = @MaChuyenTau
    AND [CT].[NgayDi] = @NgayDi
GROUP BY [CT].[NgayDi], [CT].[GioDi], [CT].[TinhTrang], [C].[MaChuyenTau], [C].[TenChuyen]
HAVING COUNT([CN].[TrangThai]) >= @SoLuong;
