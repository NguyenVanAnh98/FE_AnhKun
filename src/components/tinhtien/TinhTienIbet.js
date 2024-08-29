import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const TinhTienIbet = () => {
    const [customers, setCustomers] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tiGiaTuan, setTiGiaTuan] = useState('');
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/khachhang/ibet')
            .then(response => {
                setCustomers(response.data);
                setCustomerData(response.data.map(customer => ({
                    id: customer.id,
                    anThua: '',
                    coBanh: '',
                    coGame: '',
                    tiSo: '',
                    soDe: '',
                    tienUng: '',
                    tienGop: '',
                    comm: ''
                })));
            })
            .catch(error => {
                console.error('Error fetching IBET customers:', error);
                alert('Có lỗi xảy ra khi lấy danh sách khách hàng IBET: ' + error.message);
            });
    }, []);

    const handleInputChange = (index, field, value) => {
        const newCustomerData = [...customerData];
        newCustomerData[index][field] = value;
        setCustomerData(newCustomerData);
    };

    const handleSubmit = () => {
        const payload = {
            startDate,
            endDate,
            tiGiaTuan,
            customerData
        };
        console.log('Submitted Data:', payload);
        // Uncomment the following lines to enable posting data
        // axios.post('your-api-endpoint', payload)
        //     .then(response => {})
        //     .catch(error => {});
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Tính Tiền IBET
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    label="Ngày Bắt Đầu"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ marginRight: 16 }}
                />
                <TextField
                    label="Ngày Kết Thúc"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ marginRight: 16 }}
                />
                <TextField
                    label="Tỉ Giá Tuần"
                    type="number"
                    value={tiGiaTuan}
                    onChange={(e) => setTiGiaTuan(e.target.value)}
                    fullWidth
                />
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Khách Hàng</TableCell>
                        <TableCell>Ăn Thua</TableCell>
                        <TableCell>Cỏ Banh</TableCell>
                        <TableCell>Cỏ Game</TableCell>
                        <TableCell>Tỉ Số</TableCell>
                        <TableCell>Số Đề</TableCell>
                        <TableCell>Tiền Ứng</TableCell>
                        <TableCell>Tiền Góp</TableCell>
                        <TableCell>Comm</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer, index) => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            {['anThua', 'coBanh', 'coGame', 'tiSo', 'soDe', 'tienUng', 'tienGop', 'comm'].map(field => (
                                <TableCell key={field}>
                                    <TextField
                                        type="number"
                                        value={customerData[index][field]}
                                        onChange={(e) => handleInputChange(index, field, e.target.value)}
                                        fullWidth
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Xác Nhận
                </Button>
            </Box>
        </Container>
    );
};

export default TinhTienIbet;
