SELECT 
    COUNT( MaTKKH) AS SLKHDatVe
FROM LSDatVe
WHERE MaTKKH IS NOT NULL
    AND MONTH(NgayDatVe) = MONTH(GETDATE());