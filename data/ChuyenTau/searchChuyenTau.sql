
SELECT
    [CT].[NgayDi],
    [CT].[GioDi],
    [CT].[TinhTrang],
    [C].[MaChuyenTau],
    [C].[TenChuyen],
    COUNT(CASE WHEN [CN].[MaKhachDiChung] IS NULL THEN 1 ELSE NULL END) AS [SoLuongMaKhachDiChungIsNull]
FROM [ChuyenTau] [C]
INNER JOIN [ChiTietChuyenTau] [CT]
    ON [C].[MaChuyenTau] = [CT].[MaChuyenTau]
LEFT JOIN [ChiTietChoNgoi] [CN]
    ON [CT].[MaCTCT] = [CN].[MaCTCT]
WHERE [C].[MaChuyenTau] = @MaChuyenTau
    AND [CT].[NgayDi] = @NgayDi
GROUP BY [CT].[NgayDi], [CT].[GioDi], [CT].[TinhTrang], [C].[MaChuyenTau], [C].[TenChuyen]
HAVING   COUNT(CASE WHEN [CN].[MaKhachDiChung] IS NULL THEN 1 ELSE NULL END) >=  @SoLuong;