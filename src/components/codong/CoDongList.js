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
import ManageCoDong from './ManageCoDong';
import ChiTietCoDong from './ChiTietCoDong';

const CoDongList = () => {
    const [coDongList, setCoDongList] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openManage, setOpenManage] = useState(false);
    const [openChiTiet, setOpenChiTiet] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/codong')
            .then(response => {
                setCoDongList(response.data);
            })
            .catch(error => {
                console.error('Error fetching people:', error);
                alert('Có lỗi xảy ra khi lấy danh sách cổ đông: ' + error.message);
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

    const handleAdd = (newCoDong) => {
        setCoDongList([...coDongList, newCoDong]);
    };

    const handleUpdate = (updatedCoDong) => {
        setCoDongList(coDongList.map(coDong =>
            coDong.id === updatedCoDong.id ? updatedCoDong : coDong
        ));
    };

    const handleDelete = (id) => {
        setCoDongList(coDongList.filter(coDong => coDong.id !== id));
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
                    DANH SÁCH CỔ ĐÔNG
                </Typography>
            </Box>
            <Box mb={2} display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenManage(null, 'add')}
                >
                    Thêm Cổ Đông
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/timkiemtinhtiencodong')}
                >
                    Chi Tiết Tính Tiền Cổ Đông
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/chungchicodong')}
                >
                    CHUNG CHI CỔ ĐÔNG
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mã Cổ Đông</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Tiền Cũ</TableCell>
                        <TableCell>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {coDongList.length > 0 ? (
                        coDongList.map(coDong => (
                            <TableRow key={coDong.id}>
                                <TableCell>{coDong.id}</TableCell>
                                <TableCell>{coDong.name}</TableCell>
                                <TableCell>{coDong.oldMoney}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleOpenChiTiet(coDong.id)}
                                        color="info"
                                        style={{ marginRight: 8 }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenManage(coDong.id, 'edit')}
                                        color="secondary"
                                        style={{ marginRight: 8 }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenManage(coDong.id, 'delete')}
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
                <ManageCoDong
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
                <ChiTietCoDong
                    id={selectedId}
                    onClose={handleCloseChiTiet}
                />
            </Dialog>
        </Container>
    );
};

export default CoDongList;
