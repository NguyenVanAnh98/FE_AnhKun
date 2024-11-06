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

const ChiTietCoDong = ({ id, onClose }) => {
    const [coDongDetail, setCoDongDetail] = useState("");

    useEffect(() => {
        // Lấy thông tin chi tiết của người theo, bao gồm danh sách khách hàng và xu theo
        axios.get(`http://localhost:8080/api/phantramcodong/${id}`)
            .then(response => {
                setCoDongDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching person details:', error);
                alert('Có lỗi xảy ra khi lấy chi tiết cổ đông: ' + error.message);
            });
    }, [id]);

    if (!coDongDetail) return null;

    return (
        <>
            <DialogTitle>Xem Chi Tiết Cổ Đông</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="h6">Tên Cổ Đông:</Typography>
                    <Typography>{coDongDetail.name}</Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6">Danh Sách Khách Hàng và Phần Trăm :</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên Khách Hàng</TableCell>
                                <TableCell>Phần Trăm Theo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coDongDetail.map((khachHang, index) => (
                                <TableRow key={index}>
                                    <TableCell>{khachHang.khachHang.name}</TableCell>
                                    <TableCell>{khachHang.phanTramTheo}</TableCell>
                                </TableRow>
                            ))}
                            {coDongDetail.length === 0 && (
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

export default ChiTietCoDong;
