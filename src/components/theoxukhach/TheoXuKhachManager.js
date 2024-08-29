import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
    TextField,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const TheoXuKhachManager = () => {
    const [xuKhachList, setXuKhachList] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [currentXuKhach, setCurrentXuKhach] = useState({ xuTheo: '', tenKhachTheo: '' });

    useEffect(() => {
        fetchXuKhachList();
    }, []);

    const fetchXuKhachList = async () => {
        try {
            const response = await axios.get('/api/theoxukhach');
            setXuKhachList(response.data);
        } catch (error) {
            console.error('Failed to fetch TheoXuKhach list:', error);
        }
    };

    const handleOpenDialog = (index = null) => {
        if (index !== null) {
            setEditingIndex(index);
            setCurrentXuKhach(xuKhachList[index]);
        } else {
            setEditingIndex(null);
            setCurrentXuKhach({ xuTheo: '', tenKhachTheo: '' });
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentXuKhach({ ...currentXuKhach, [name]: value });
    };

    const handleSave = async () => {
        try {
            if (editingIndex !== null) {
                // Edit existing TheoXuKhach
                await axios.put(`/api/theoxukhach/${xuKhachList[editingIndex].id}`, currentXuKhach);
            } else {
                // Add new TheoXuKhach
                await axios.post('/api/theoxukhach', currentXuKhach);
            }
            fetchXuKhachList();
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to save TheoXuKhach:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/theoxukhach/${id}`);
            fetchXuKhachList();
        } catch (error) {
            console.error('Failed to delete TheoXuKhach:', error);
        }
    };

    return (
        <div>
            <Button onClick={() => handleOpenDialog()} startIcon={<Add />} variant="contained" color="primary">
                Thêm Theo Xu Khách
            </Button>
            <Table>
                <TableBody>
                    {xuKhachList.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.tenKhachTheo}</TableCell>
                            <TableCell>{item.xuTheo}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpenDialog(index)} color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(item.id)} color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{editingIndex !== null ? 'Sửa Theo Xu Khách' : 'Thêm Theo Xu Khách'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tên Khách Theo"
                        name="tenKhachTheo"
                        value={currentXuKhach.tenKhachTheo}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Số Xu Theo"
                        name="xuTheo"
                        type="number"
                        value={currentXuKhach.xuTheo}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TheoXuKhachManager;
