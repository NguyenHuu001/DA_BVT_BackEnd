SELECT
    ctt.MaCTCT AS MaCTCT,
    ct.TenChuyen AS TenChuyen,
    ctt.NgayDi AS NgayDi,
    ctt.GioDi AS GioDi,
    ctt.TinhTrang AS TinhTrang
FROM
    ChuyenTau ct
JOIN
    ChiTietChuyenTau ctt ON ct.MaChuyenTau = ctt.MaChuyenTau
WHERE
    ctt.NgayDi >= GETDATE()
ORDER BY
    ctt.NgayDi;