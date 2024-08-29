import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

const LoaiForm = ({ id, mode, onClose, onAdd, onUpdate }) => {
    const [tenLoai, setTenLoai] = useState('');
    const [phanTram, setPhanTram] = useState('');

    useEffect(() => {
        if (mode === 'edit' && id) {
            axios.get(`http://localhost:8080/api/loai/${id}`)
                .then(response => {
                    setTenLoai(response.data.tenLoai);
                    setPhanTram(response.data.phanTram);
                })
                .catch(error => {
                    console.error('Error fetching type details:', error);
                    alert('Có lỗi xảy ra khi lấy thông tin loại: ' + error.message);
                });
        }
    }, [id, mode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (mode === 'add') {
            axios.post('http://localhost:8080/api/loai', { tenLoai, phanTram })
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Error adding type:', error);
                    alert('Có lỗi xảy ra khi thêm loại: ' + error.message);
                });
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8080/api/loai/${id}`, { tenLoai, phanTram })
                .then(response => {
                    onUpdate(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Error updating type:', error);
                    alert('Có lỗi xảy ra khi cập nhật loại: ' + error.message);
                });
        }
    };

    return (
        <>
            <DialogTitle>{mode === 'add' ? 'Thêm Loại' : 'Sửa Loại'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên Loại"
                    fullWidth
                    value={tenLoai}
                    onChange={(e) => setTenLoai(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Phần Trăm"
                    fullWidth
                    type="number"
                    value={phanTram}
                    onChange={(e) => setPhanTram(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {mode === 'add' ? 'Thêm' : 'Cập Nhật'}
                </Button>
            </DialogActions>
        </>
    );
};

export default LoaiForm;
