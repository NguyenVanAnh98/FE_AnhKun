import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';

const ChiTietNguoiTheo = ({ id, onClose }) => {
    const [nguoiTheoDetail, setNguoiTheoDetail] = useState(null);

    useEffect(() => {
        // Lấy thông tin chi tiết của người theo, bao gồm danh sách khách hàng và xu theo
        axios.get(`http://localhost:8080/api/nguoitheo/${id}/detail`)
            .then(response => {
                setNguoiTheoDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching person details:', error);
                alert('Có lỗi xảy ra khi lấy chi tiết người theo: ' + error.message);
            });
    }, [id]);

    if (!nguoiTheoDetail) return null;

    return (
        <>
            <DialogTitle>Xem Chi Tiết Người Theo</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="h6">Tên Người Theo:</Typography>
                    <Typography>{nguoiTheoDetail.name}</Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6">Danh Sách Khách Hàng và Xu Theo:</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên Khách Hàng</TableCell>
                                <TableCell>Số Lượng Xu Theo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nguoiTheoDetail.khachHangList.map((khachHang, index) => (
                                <TableRow key={index}>
                                    <TableCell>{khachHang.name}</TableCell>
                                    <TableCell>{khachHang.xuTheo}</TableCell>
                                </TableRow>
                            ))}
                            {nguoiTheoDetail.khachHangList.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={2}>Không có dữ liệu</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </>
    );
};

export default ChiTietNguoiTheo;
