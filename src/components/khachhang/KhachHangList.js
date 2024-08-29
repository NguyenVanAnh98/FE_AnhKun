import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Container,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ThemKhachHang from './ThemKhachHang';
import EditKhachHang from './EditKhachHang';
import ChiTietKhachHang from './ChiTietKhachHang';

const KhachHangList = () => {
    const [khachHangList, setKhachHangList] = useState([]);
    const [selectedKhachHangId, setSelectedKhachHangId] = useState(null);
    const [openDialog, setOpenDialog] = useState({
        them: false,
        edit: false,
        chiTiet: false,
        tinhTien: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchKhachHangList();
    }, []);

    const fetchKhachHangList = () => {
        axios.get('http://localhost:8080/api/khachhang')
            .then(response => {
                setKhachHangList(response.data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
                alert('Có lỗi xảy ra khi lấy danh sách khách hàng: ' + error.message);
            });
    };

    const handleDialogOpen = (type, id = null) => {
        setSelectedKhachHangId(id);
        setOpenDialog(prev => ({ ...prev, [type]: true }));
    };

    const handleDialogClose = (type) => {
        setOpenDialog(prev => ({ ...prev, [type]: false }));
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            axios.delete(`http://localhost:8080/api/khachhang/${id}`)
                .then(() => {
                    setKhachHangList(prevList => prevList.filter(kh => kh.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting customer:', error);
                    alert('Có lỗi xảy ra khi xóa khách hàng: ' + error.message);
                });
        }
    };

    const handleTinhTien = (option) => {
        if (option === 'ibet') {
            navigate('/tinhtienIbet');
        } else if (option === 'sbo') {
            navigate('/tinhtienSbo');
        }
        handleDialogClose('tinhTien');
    };

    return (
        <Container>
            <Box mb={2}>
                <Typography
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    style={{ fontWeight: 'bold' }}
                >
                    DANH SÁCH KHÁCH HÀNG
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDialogOpen('them')}
                        style={{ marginRight: '1cm' }}
                    >
                        Thêm Khách Hàng
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/nguoitheo')}
                        style={{ marginRight: '1cm' }}
                    >
                        Người Theo
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/loai')}
                        style={{ marginRight: '1cm' }}
                    >
                        Loại
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDialogOpen('tinhTien')}
                >
                    Tính Tiền
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mã Khách Hàng</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Giá Đồ</TableCell>
                        <TableCell>Giá Banh</TableCell>
                        <TableCell>Giá Game</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {khachHangList.map(khachHang => (
                        <TableRow key={khachHang.id}>
                            <TableCell>{khachHang.maKhachHang}</TableCell>
                            <TableCell>{khachHang.name}</TableCell>
                            <TableCell>{khachHang.giaDo}</TableCell>
                            <TableCell>{khachHang.giaBanh}</TableCell>
                            <TableCell>{khachHang.giaGame}</TableCell>
                            <TableCell>{khachHang.loai ? khachHang.loai.tenLoai : 'Chưa xác định'}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => handleDialogOpen('chiTiet', khachHang.id)}
                                    color="primary"
                                >
                                    Xem Chi Tiết
                                </Button>
                                <Button
                                    onClick={() => handleDialogOpen('edit', khachHang.id)}
                                    color="secondary"
                                >
                                    Sửa
                                </Button>
                                <Button
                                    onClick={() => handleDelete(khachHang.id)}
                                    color="error"
                                >
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog
                open={openDialog.them}
                onClose={() => handleDialogClose('them')}
                fullWidth
                maxWidth="sm"
            >
                <ThemKhachHang
                    onClose={() => {
                        handleDialogClose('them');
                        fetchKhachHangList();
                    }}
                />
            </Dialog>

            <Dialog
                open={openDialog.edit}
                onClose={() => handleDialogClose('edit')}
                fullWidth
                maxWidth="sm"
            >
                <EditKhachHang
                    id={selectedKhachHangId}
                    onClose={() => {
                        handleDialogClose('edit');
                        fetchKhachHangList();
                    }}
                />
            </Dialog>

            <Dialog
                open={openDialog.chiTiet}
                onClose={() => handleDialogClose('chiTiet')}
                fullWidth
                maxWidth="sm"
            >
                <ChiTietKhachHang
                    khachHangId={selectedKhachHangId}
                    onClose={() => handleDialogClose('chiTiet')}
                />
            </Dialog>

            <Dialog
                open={openDialog.tinhTien}
                onClose={() => handleDialogClose('tinhTien')}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Chọn Loại Tính Tiền</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleTinhTien('ibet')}
                            style={{ marginBottom: '1cm', width: '80%' }}
                        >
                            Tính Tiền IBET
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleTinhTien('sbo')}
                            style={{ width: '80%' }}
                        >
                            Tính Tiền SBO
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose('tinhTien')} color="secondary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default KhachHangList;
