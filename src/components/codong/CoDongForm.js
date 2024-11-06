import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

const CoDongForm = ({ id, mode, onClose, onAdd, onUpdate, onDelete }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (id && mode === 'edit') {
            axios.get(`http://localhost:8080/api/codong/${id}`)
                .then(response => setName(response.data.name))
                .catch(error => console.error('Error fetching person:', error));
        }
    }, [id, mode]);

    const handleSave = () => {
        const data = { name };

        if (mode === 'add') {
            axios.post('http://localhost:8080/api/codong', data)
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => console.error('Error creating person:', error));
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8080/api/codong/${id}`, data)
                .then(response => {
                    onUpdate(response.data);
                    onClose();
                })
                .catch(error => console.error('Error updating person:', error));
        } else if (mode === 'delete') {
            axios.delete(`http://localhost:8080/api/codong/${id}`)
                .then(() => {
                    onDelete(id);
                    onClose();
                })
                .catch(error => console.error('Error deleting person:', error));
        }
    };

    return (
        <>
            <DialogTitle>
                {mode === 'add' ? 'Thêm Cổ Đông' : mode === 'edit' ? 'Sửa Cổ Đông' : 'Xóa Cổ Đông'}
            </DialogTitle>
            <DialogContent>
                {mode === 'delete' ? (
                    <Typography variant="body1">
                        Bạn có chắc chắn muốn xóa cổ đông này?
                    </Typography>
                ) : (
                    <TextField
                        label="Tên Cổ Đông"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary">
                    {mode === 'delete' ? 'Xóa' : 'Lưu'}
                </Button>
            </DialogActions>
        </>
    );
};

export default CoDongForm;
