import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';

const ManageLoai = ({ loai, onClose, onSave }) => {
    const [tenLoai, setTenLoai] = useState('');
    const [phanTram, setPhanTram] = useState('');

    useEffect(() => {
        if (loai) {
            setTenLoai(loai.tenLoai);
            setPhanTram(loai.phanTram);
        } else {
            setTenLoai('');
            setPhanTram('');
        }
    }, [loai]);

    const handleSave = () => {
        if (!tenLoai || !phanTram) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const data = { tenLoai, phanTram: parseFloat(phanTram) };

        if (loai) {
            // Cập nhật loại
            axios.put(`http://localhost:8080/api/loai/${loai.id}`, data)
                .then(() => {
                    alert('Cập nhật loại thành công!');
                    onSave();
                })
                .catch(error => {
                    console.error('Error updating data:', error);
                    alert('Có lỗi xảy ra khi cập nhật loại.');
                });
        } else {
            // Thêm loại mới
            axios.post('http://localhost:8080/api/loai', data)
                .then(() => {
                    alert('Thêm loại thành công!');
                    onSave();
                })
                .catch(error => {
                    console.error('Error creating data:', error);
                    alert('Có lỗi xảy ra khi thêm loại.');
                });
        }
    };

    return (
        <>
            <DialogTitle>{loai ? 'Sửa Loại' : 'Thêm Loại'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Tên Loại"
                    value={tenLoai}
                    onChange={(e) => setTenLoai(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Phần Trăm"
                    type="number"
                    value={phanTram}
                    onChange={(e) => setPhanTram(e.target.value)}
                    fullWidth
                    margin="dense"
                    inputProps={{ step: "0.01" }} // Đặt bước cho trường phần trăm
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </>
    );
};

export default ManageLoai;
