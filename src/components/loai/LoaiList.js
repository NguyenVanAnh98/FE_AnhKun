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
import LoaiForm from './LoaiForm'; // Import component form để thêm, sửa loại

const LoaiList = () => {
    const [loaiList, setLoaiList] = useState([]);
    const [selectedLoaiId, setSelectedLoaiId] = useState(null);
    const [openLoaiForm, setOpenLoaiForm] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add' hoặc 'edit'

    const navigate = useNavigate(); // Add useNavigate hook

    useEffect(() => {
        axios.get('http://localhost:8080/api/loai')
            .then(response => {
                setLoaiList(response.data);
            })
            .catch(error => {
                console.error('Error fetching types:', error);
                alert('Có lỗi xảy ra khi lấy danh sách loại: ' + error.message);
            });
    }, []);

    const handleOpenLoaiForm = (id, mode) => {
        setSelectedLoaiId(id);
        setFormMode(mode);
        setOpenLoaiForm(true);
    };
    const handleCloseLoaiForm = () => setOpenLoaiForm(false);

    const handleAdd = (newLoai) => {
        setLoaiList([...loaiList, newLoai]);
    };

    const handleUpdate = (updatedLoai) => {
        setLoaiList(loaiList.map(loai =>
            loai.id === updatedLoai.id ? updatedLoai : loai
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa loại này?')) {
            axios.delete(`http://localhost:8080/api/loai/${id}`)
                .then(() => {
                    setLoaiList(loaiList.filter(loai => loai.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting type:', error);
                    alert('Có lỗi xảy ra khi xóa loại: ' + error.message);
                });
        }
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
                    DANH SÁCH LOẠI
                </Typography>
            </Box>
            <Box mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenLoaiForm(null, 'add')}
                >
                    Thêm Loại
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mã Loại</TableCell>
                        <TableCell>Tên Loại</TableCell>
                        <TableCell>Phần Trăm</TableCell> {/* Thêm cột phần trăm */}
                        <TableCell>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loaiList.map(loai => (
                        <TableRow key={loai.id}>
                            <TableCell>{loai.id}</TableCell>
                            <TableCell>{loai.tenLoai}</TableCell>
                            <TableCell>{loai.phanTram ? `${loai.phanTram}%` : 'Chưa xác định'}</TableCell> {/* Hiển thị phần trăm */}
                            <TableCell>
                                <Button
                                    onClick={() => handleOpenLoaiForm(loai.id, 'edit')}
                                    color="secondary"
                                >
                                    Sửa
                                </Button>
                                <Button
                                    onClick={() => handleDelete(loai.id)}
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
                open={openLoaiForm}
                onClose={handleCloseLoaiForm}
                fullWidth
                maxWidth="sm"
            >
                <LoaiForm
                    id={selectedLoaiId}
                    mode={formMode}
                    onClose={handleCloseLoaiForm}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                />
            </Dialog>
        </Container>
    );
};

export default LoaiList;
