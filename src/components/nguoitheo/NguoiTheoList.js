import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
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
import ManageNguoiTheo from './ManageNguoiTheo';
import ChiTietNguoiTheo from './ChiTietNguoiTheo';

const NguoiTheoList = () => {
    const [nguoiTheoList, setNguoiTheoList] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openManage, setOpenManage] = useState(false);
    const [openChiTiet, setOpenChiTiet] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/nguoitheo')
            .then(response => {
                setNguoiTheoList(response.data);
            })
            .catch(error => {
                console.error('Error fetching people:', error);
                alert('Có lỗi xảy ra khi lấy danh sách người theo: ' + error.message);
            });
    }, []);

    const handleOpenManage = (id, mode) => {
        setSelectedId(id);
        setFormMode(mode);
        setOpenManage(true);
    };

    const handleCloseManage = () => {
        setOpenManage(false);
    };

    const handleOpenChiTiet = (id) => {
        setSelectedId(id);
        setOpenChiTiet(true);
    };

    const handleCloseChiTiet = () => {
        setOpenChiTiet(false);
    };

    const handleAdd = (newNguoiTheo) => {
        setNguoiTheoList([...nguoiTheoList, newNguoiTheo]);
    };

    const handleUpdate = (updatedNguoiTheo) => {
        setNguoiTheoList(nguoiTheoList.map(nguoiTheo =>
            nguoiTheo.id === updatedNguoiTheo.id ? updatedNguoiTheo : nguoiTheo
        ));
    };

    const handleDelete = (id) => {
        setNguoiTheoList(nguoiTheoList.filter(nguoiTheo => nguoiTheo.id !== id));
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
                    DANH SÁCH NGƯỜI THEO
                </Typography>
            </Box>
            <Box mb={2} display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenManage(null, 'add')}
                >
                    Thêm Người Theo
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/chitiettinhtiennguoitheo')}
                >
                    Chi Tiết Tính Tiền Người Theo
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mã Người Theo</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Tiền Cũ</TableCell>
                        <TableCell>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nguoiTheoList.length > 0 ? (
                        nguoiTheoList.map(nguoiTheo => (
                            <TableRow key={nguoiTheo.id}>
                                <TableCell>{nguoiTheo.id}</TableCell>
                                <TableCell>{nguoiTheo.name}</TableCell>
                                <TableCell>{nguoiTheo.oldMoney}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleOpenChiTiet(nguoiTheo.id)}
                                        color="info"
                                        style={{ marginRight: 8 }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenManage(nguoiTheo.id, 'edit')}
                                        color="secondary"
                                        style={{ marginRight: 8 }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenManage(nguoiTheo.id, 'delete')}
                                        color="error"
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Dialog
                open={openManage}
                onClose={handleCloseManage}
                fullWidth
                maxWidth="sm"
            >
                <ManageNguoiTheo
                    id={selectedId}
                    mode={formMode}
                    onClose={handleCloseManage}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            </Dialog>

            <Dialog
                open={openChiTiet}
                onClose={handleCloseChiTiet}
                fullWidth
                maxWidth="sm"
            >
                <ChiTietNguoiTheo
                    id={selectedId}
                    onClose={handleCloseChiTiet}
                />
            </Dialog>
        </Container>
    );
};

export default NguoiTheoList;
