import React from 'react';
import { Button,TextField, Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Tinhtien2() {
    const [customers, setCustomers] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tyGiaTuan, setTiGiaTuan] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (index, field, value) => {
        const newCustomerData = [...customerData];
        newCustomerData[index][field] = value;
        const updatedCustomerData = customerData.map(data => ({
            ...data,
            startDate,
            endDate,
            tyGiaTuan
        }));
        setCustomerData(updatedCustomerData);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/khachhang/ibet')
            .then(response => {
                setCustomers(response.data);
                setCustomerData(response.data.map(customer => ({
                    idKH: customer.id,
                    anThua: '',
                    coBanh: '',
                    coGame: '',
                    tiSo: '',
                    soDe: '',
                    tienUng: '',
                    tienGop: '',
                    comm: '',
                    startDate: '',
                    endDate: '',
                    tyGiaTuan: ''
                })));
            })
            .catch(error => {
                console.error('Error fetching IBET customers:', error);
                alert('Có lỗi xảy ra khi lấy danh sách khách hàng IBET: ' + error.message);
            });
    }, []);
    
    const handleSubmit =  () => {
        console.log(customerData);
        console.log(startDate);
        console.log(endDate);
        console.log(tyGiaTuan);
        axios.post('http://localhost:8080/api/tinhtien/save', customerData).then(response => {
            alert("Đã lưu!")
            navigate("/")
        })

        
    }
    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>Tính tiền IBET</Typography>
            <Box display="flex" justifyContent="space-between" mb={3}>
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
                    value={tyGiaTuan}
                    onChange={(e) => setTiGiaTuan(e.target.value)}
                    fullWidth
                />
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Khách Hàng</TableCell>
                        <TableCell>Tổng cộng Banh</TableCell>
                        <TableCell>Tổng cộng Khách Hàng</TableCell>
                        <TableCell>Tổng cộng Công Ty</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((c, index) => (
                        <TableRow key={c.id}>
                            <TableCell>{c.name}</TableCell>
                            <TableCell>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Ăn Thua"
                                            type="number"
                                            value={customerData[index].anThua}
                                            onChange={(e) => handleInputChange(index, 'anThua', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Cỏ Banh"
                                            type="number"
                                            value={customerData[index].coBanh}
                                            onChange={(e) => handleInputChange(index, 'coBanh', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Cỏ Game"
                                            type="number"
                                            value={customerData[index].coGame}
                                            onChange={(e) => handleInputChange(index, 'coGame', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong>
                                        Tổng cộng: {
                                        ((parseFloat(customerData[index].anThua)*c.giaDo*1000 || 0) + 
                                        (parseFloat(customerData[index].coBanh)*c.giaDo*c.giaBanh || 0) + 
                                        (parseFloat(customerData[index].coGame)*c.giaGame*c.giaDo || 0)).toLocaleString('de-DE') +"VND"
                                    }
                                        </strong>
                                    </Grid>

                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Tỉ Số"
                                            type="number"
                                            value={customerData[index].tiSo}
                                            onChange={(e) => handleInputChange(index, 'tiSo', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Số Đề"
                                            type="number"
                                            value={customerData[index].soDe}
                                            onChange={(e) => handleInputChange(index, 'soDe', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Tiền Ứng"
                                            type="number"
                                            value={customerData[index].tienUng}
                                            onChange={(e) => handleInputChange(index, 'tienUng', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Tiền Góp"
                                            type="number"
                                            value={customerData[index].tienGop}
                                            onChange={(e) => handleInputChange(index, 'tienGop', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong>
Tổng cộng khách hàng: {
                                                ((parseFloat(customerData[index].tiSo) || 0)+
                                                (parseFloat(customerData[index].soDe) || 0)+
                                                (parseFloat(customerData[index].tienUng) || 0)+
                                                (parseFloat(customerData[index].tienGop) || 0)+
                                                (parseFloat(customerData[index].anThua)*c.giaDo*1000 || 0) + 
                                                (parseFloat(customerData[index].coBanh)*c.giaDo*c.giaBanh || 0) + 
                                                (parseFloat(customerData[index].coGame)*c.giaGame*c.giaDo || 0)).toLocaleString('de-DE') +"VND"
                                            }
                                        </strong>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Comm"
                                            type="number"
                                            value={customerData[index].comm}
                                            onChange={(e) => handleInputChange(index, 'comm', e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong>    
                                            Tổng cộng công ty: {
                                                ((parseFloat(customerData[index].comm) + parseFloat(customerData[index].anThua)) * tyGiaTuan * c.loai.phanTram/100 || 0).toLocaleString('de-DE') +"VND"
                                            }
                                        </strong>
                                    </Grid>
                                </Grid>
                            </TableCell>
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
}