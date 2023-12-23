UPDATE ChiTietChuyenTau
SET
    NgayDi = @NgayDi,
    GioDi = @GioDi
WHERE
    MaCTCT = @MaCTCT;
