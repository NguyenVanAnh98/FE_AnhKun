import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from '@mui/material';

const ChiTietKhachHang = ({ khachHangId, onClose }) => {
    const [khachHang, setKhachHang] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/khachhang/${khachHangId}`)
            .then(response => {
                setKhachHang(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
                alert('Có lỗi xảy ra khi lấy thông tin khách hàng: ' + error.message);
            });
    }, [khachHangId]);

    if (!khachHang) {
        return null;
    }

    // Kiểm tra xem nguoiTheos có phải là mảng không và không null
    const nguoiTheoMap = Array.isArray(khachHang.nguoiTheos) ? khachHang.nguoiTheos.reduce((map, nguoiTheo) => {
        map[nguoiTheo.id] = nguoiTheo.name;
        return map;
    }, {}) : {};

    return (
        <Dialog open={Boolean(khachHangId)} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Xem Chi Tiết Khách Hàng</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Thông Tin Khách Hàng
                </Typography>
                <Typography variant="body1">
                    <strong>Mã Khách Hàng:</strong> {khachHang.maKhachHang}
                </Typography>
                <Typography variant="body1">
                    <strong>Tên:</strong> {khachHang.name}
                </Typography>
                <Typography variant="body1">
                    <strong>Giá Đồ:</strong> {khachHang.giaDo}
                </Typography>
                <Typography variant="body1">
                    <strong>Giá Banh:</strong> {khachHang.giaBanh}
                </Typography>
                <Typography variant="body1">
                    <strong>Giá Game:</strong> {khachHang.giaGame}
                </Typography>
                <Typography variant="body1">
                    <strong>Loại:</strong> {khachHang.loai ? khachHang.loai.tenLoai : 'Chưa xác định'}
                </Typography>

                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Danh Sách Theo Xu Khách
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên Khách Theo</TableCell>
                            <TableCell>Xu Theo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {khachHang.theoXuKhachs && khachHang.theoXuKhachs.length > 0 ? (
                            khachHang.theoXuKhachs.map(theoXuKhach => (
                                <TableRow key={theoXuKhach.id}>
                                    <TableCell>
                                        {theoXuKhach.tenKhachTheo || 'Tên khách theo không có'}
                                    </TableCell>
                                    <TableCell>{theoXuKhach.xuTheo}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2}>Không có thông tin theo xu khách</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChiTietKhachHang;
