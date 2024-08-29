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

const NguoiTheoForm = ({ id, mode, onClose, onAdd, onUpdate, onDelete }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (id && mode === 'edit') {
            axios.get(`http://localhost:8080/api/nguoitheo/${id}`)
                .then(response => setName(response.data.name))
                .catch(error => console.error('Error fetching person:', error));
        }
    }, [id, mode]);

    const handleSave = () => {
        const data = { name };

        if (mode === 'add') {
            axios.post('http://localhost:8080/api/nguoitheo', data)
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => console.error('Error creating person:', error));
        } else if (mode === 'edit') {
            axios.put(`http://localhost:8080/api/nguoitheo/${id}`, data)
                .then(response => {
                    onUpdate(response.data);
                    onClose();
                })
                .catch(error => console.error('Error updating person:', error));
        } else if (mode === 'delete') {
            axios.delete(`http://localhost:8080/api/nguoitheo/${id}`)
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
                {mode === 'add' ? 'Thêm Người Theo' : mode === 'edit' ? 'Sửa Người Theo' : 'Xóa Người Theo'}
            </DialogTitle>
            <DialogContent>
                {mode === 'delete' ? (
                    <Typography variant="body1">
                        Bạn có chắc chắn muốn xóa người theo này?
                    </Typography>
                ) : (
                    <TextField
                        label="Tên Người Theo"
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

export default NguoiTheoForm;
