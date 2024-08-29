import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThemTheoXuKhach = () => {
    const [tenKhachTheo, setTenKhachTheo] = useState('');
    const [xuTheo, setXuTheo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Gửi dữ liệu đến API
        axios.post('/api/theoxukhach', { tenKhachTheo, xuTheo })
            .then(() => {
                navigate('/theoxukhach');
            })
            .catch(error => {
                console.error('Có lỗi khi thêm TheoXuKhach:', error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Thêm Mới Theo Xu Khách
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Tên Khách Theo"
                    fullWidth
                    margin="normal"
                    value={tenKhachTheo}
                    onChange={(e) => setTenKhachTheo(e.target.value)}
                    required
                />
                <TextField
                    label="Xu Theo"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={xuTheo}
                    onChange={(e) => setXuTheo(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Thêm
                </Button>
            </form>
        </Container>
    );
};

export default ThemTheoXuKhach;
