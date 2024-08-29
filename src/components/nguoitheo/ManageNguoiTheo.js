import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

const ManageNguoiTheo = ({ id, mode, onClose, onAdd, onUpdate, onDelete }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (mode === 'edit' && id) {
            axios.get(`http://localhost:8080/api/nguoitheo/${id}`)
                .then(response => {
                    setName(response.data.name);
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                    alert('Có lỗi xảy ra khi lấy thông tin người theo: ' + error.message);
                });
        }
    }, [id, mode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (mode === 'add') {
            axios.post('http://localhost:8080/api/nguoitheo', { name })
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Error adding person:', error);
                    alert('Có lỗi xảy ra khi thêm người theo: ' + error.message);
                });
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8080/api/nguoitheo/${id}`, { name })
                .then(response => {
                    onUpdate(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Error updating person:', error);
                    alert('Có lỗi xảy ra khi cập nhật người theo: ' + error.message);
                });
        } else if (mode === 'delete') {
            if (window.confirm('Bạn có chắc chắn muốn xóa người theo này?')) {
                axios.delete(`http://localhost:8080/api/nguoitheo/${id}`)
                    .then(() => {
                        onDelete(id);
                        onClose();
                    })
                    .catch(error => {
                        console.error('Error deleting person:', error);
                        alert('Có lỗi xảy ra khi xóa người theo: ' + error.message);
                    });
            }
        }
    };

    return (
        <>
            <DialogTitle>{mode === 'add' ? 'Thêm Người Theo' : mode === 'edit' ? 'Sửa Người Theo' : 'Xóa Người Theo'}</DialogTitle>
            <DialogContent>
                {(mode === 'add' || mode === 'edit') && (
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên"
                    fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {mode === 'add' ? 'Thêm' : mode === 'edit' ? 'Cập Nhật' : 'Xóa'}
                </Button>
            </DialogActions>
        </>
    );
};

export default ManageNguoiTheo;
