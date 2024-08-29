import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TheoXuKhachList = () => {
    const [theoXuKhachList, setTheoXuKhachList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch danh sách TheoXuKhach từ API
        axios.get('http://localhost:8080/api/theoxukhach')
            .then(response => {
                setTheoXuKhachList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Có lỗi khi lấy danh sách TheoXuKhach:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        // Xóa TheoXuKhach
        axios.delete(`http://localhost:8080/api/theoxukhach/${id}`)
            .then(() => {
                setTheoXuKhachList(theoXuKhachList.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error('Có lỗi khi xóa TheoXuKhach:', error);
            });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Danh Sách Theo Xu Khách
            </Typography>
            <Button component={Link} to="/them-theo-xu-khach" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                Thêm Mới Theo Xu Khách
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên Khách Theo</TableCell>
                            <TableCell>Xu Theo</TableCell>
                            <TableCell>ID Khách Hàng</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress />
                                    Đang tải...
                                </TableCell>
                            </TableRow>
                        ) : (
                            theoXuKhachList.map(theoXuKhach => (
                                <TableRow key={theoXuKhach.id}>
                                    <TableCell>{theoXuKhach.id}</TableCell>
                                    <TableCell>{theoXuKhach.tenKhachTheo}</TableCell>
                                    <TableCell>{theoXuKhach.xuTheo}</TableCell>
                                    <TableCell>{theoXuKhach.idKhachHang}</TableCell>
                                    <TableCell>
                                        <Button component={Link} to={`/edit-theo-xu-khach/${theoXuKhach.id}`} variant="contained" color="secondary" style={{ marginRight: '10px' }}>
                                            Sửa
                                        </Button>
                                        <Button onClick={() => handleDelete(theoXuKhach.id)} variant="contained" color="error">
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TheoXuKhachList;
