SELECT
    CT.MaChuyenTau,
    CT.TenChuyen,
    CCT.NgayDi,
    CCT.GioDi,
    CCT.TinhTrang
FROM
    ChuyenTau CT
JOIN
    ChiTietChuyenTau CCT ON CT.MaChuyenTau = CCT.MaChuyenTau
WHERE
    CCT.MaCTCT = @MaCTCT;
