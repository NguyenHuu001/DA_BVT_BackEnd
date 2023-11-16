SELECT ctcn.MaCTCN, ctcn.MaGhe, cn.SoGhe AS TenGhe, ctcn.TrangThai, ctcn.MaKhachDiChung, ctcn.MaCTCT
FROM ChiTietChoNgoi ctcn
JOIN ChoNgoi cn ON ctcn.MaGhe = cn.MaGhe
WHERE ctcn.MaCTCT = @MaCTCT
ORDER BY cn.MaGhe ASC;
        



-- SELECT cn.*
-- FROM ChoNgoi cn
-- INNER JOIN ChiTietChoNgoi ctcn ON cn.MaGhe = ctcn.MaGhe
-- WHERE ctcn.MaCTCT = @MaCTCT;
