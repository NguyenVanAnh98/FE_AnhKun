import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTheoXuKhach = () => {
    const [tenKhachTheo, setTenKhachTheo] = useState('');
    const [xuTheo, setXuTheo] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch thông tin TheoXuKhach từ API
        axios.get(`/api/theoxukhach/${id}`)
            .then(response => {
                setTenKhachTheo(response.data.tenKhachTheo);
                setXuTheo(response.data.xuTheo);
            })
            .catch(error => {
                console.error('Có lỗi khi lấy thông tin TheoXuKhach:', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Cập nhật TheoXuKhach
        axios.put(`/api/theoxukhach/${id}`, { tenKhachTheo, xuTheo })
            .then(() => {
                navigate('/theoxukhach');
            })
            .catch(error => {
                console.error('Có lỗi khi cập nhật TheoXuKhach:', error);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Chỉnh Sửa Theo Xu Khách
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
                    Cập Nhật
                </Button>
            </form>
        </Container>
    );
};

export default EditTheoXuKhach;
