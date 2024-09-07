import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, MenuItem, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NguoiTheoSearch = () => {
    const [nguoiTheoList, setNguoiTheoList] = useState([]);
    const [selectedNguoiTheo, setSelectedNguoiTheo] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/nguoitheo')
            .then(response => {
                setNguoiTheoList(response.data);
            })
            .catch(error => {
                console.error('Error fetching people:', error);
                alert('Có lỗi xảy ra khi lấy danh sách người theo: ' + error.message);
            });
    }, []);

    const handleSearch = () => {
        if (selectedNguoiTheo && selectedDate) {
            // Điều hướng đến đường dẫn chi tiết
           axios.get(`http://localhost:8080/api/nguoitheo/${selectedNguoiTheo}/detail/${selectedDate}`)
           .then(res =>{
            console.log(res.data);
            
           });
           console.log(selectedDate,selectedNguoiTheo);
           
        } else {
            alert('Vui lòng chọn người theo và ngày kiểm tra.');
        }
    };

    return (
        <Container>
            <Box mb={2}>
                <Typography variant="h5" align="center" color="textPrimary">
                    Tìm Kiếm Chi Tiết Tính Tiền Người Theo
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField
                    select
                    label="Chọn Người Theo"
                    value={selectedNguoiTheo}
                    onChange={(e) => setSelectedNguoiTheo(e.target.value)}
                    fullWidth
                    variant="outlined"
                >
                    {nguoiTheoList.map(nguoiTheo => (
                        <MenuItem key={nguoiTheo.id} value={nguoiTheo.id}>
                            {nguoiTheo.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box mb={2}>
                <TextField
                    label="Ngày Kiểm Tra"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box mb={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Tìm Kiếm
                </Button>
            </Box>
        </Container>
    );
};

export default NguoiTheoSearch;
