import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, MenuItem, Box, Typography } from '@mui/material';
import axios from 'axios';

 

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

const KhachHangSearch = () => {
    const [khachHangList, setKhachHangList] = useState([]);
    const [selectedKhachHang, setSelectedKhachHang] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [khachHangDetails, setKhachHangDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState("")

    useEffect(() => {
        const fetchKhachHangList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/khachhang');
                setKhachHangList(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
                alert('Có lỗi xảy ra khi lấy danh sách khách hàng: ' + error.message);
            }
        };
        fetchKhachHangList();
    }, []);

    const handleSearch = async () => {
        if (selectedKhachHang && selectedDate) {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8080/api/tinhtien/${selectedKhachHang}/kh/${selectedDate}`);
                setKhachHangDetails(res.data || []);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                alert('Có lỗi xảy ra khi lấy chi tiết khách hàng: ' + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Vui lòng chọn khách hàng và ngày kiểm tra.');
        }
        console.log(khachHangDetails,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
    };

    return (
        <>
            <Container>
                <Box mb={2}>
                    <Typography variant="h5" align="center" color="textPrimary">
                        Tìm Kiếm Chi Tiết Khách Hàng
                    </Typography>
                </Box>
                <Box mb={2}>
                    <TextField
                        select
                        label="Chọn Khách Hàng"
                        value={selectedKhachHang}
                        onChange={(e) => setSelectedKhachHang(e.target.value)}
                        fullWidth
                        variant="outlined"
                    >
                        {khachHangList.map(khachHang => (
                            <MenuItem key={khachHang.id} value={khachHang.id}>
                                {khachHang.name}
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
            <TableContainer component={Paper}>
                <Table className="table-bordered">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" rowSpan={3}>Khách hàng</TableCell>
                            <TableCell align="center" colSpan={3}>Giá</TableCell>
                            <TableCell align="center" colSpan={4} rowSpan={2}>Thành tiền</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Giá Banh</TableCell>
                            <TableCell align="center">Giá Đô</TableCell>
                            <TableCell align="center">Giá Game</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {khachHangDetails.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Không có dữ liệu để hiển thị</TableCell>
                            </TableRow>
                        ) : (
                            khachHangDetails.map((kh, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell rowSpan={9}>{kh.khachHang.name}</TableCell>
                                        <TableCell align="center" rowSpan={9}>{kh.giaBanh}</TableCell>
                                        <TableCell align="center" rowSpan={9}>{kh.giaDo}</TableCell>
                                        <TableCell align="center" rowSpan={9}>{kh.giaGame}</TableCell>
                                        <TableCell align="center">Ăn thua</TableCell>
                                        <TableCell align="center">{kh.anThuaKhachHang.toLocaleString()}</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">{(kh.khachHang.giaDo * kh.anThuaKhachHang*1000).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Cỏ Banh</TableCell>
                                        <TableCell align="center">{kh.coBanhKhachHang.toLocaleString()}</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">{(kh.khachHang.giaBanh * kh.khachHang.giaDo * kh.coBanhKhachHang).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Cò Game</TableCell>
                                        <TableCell align="center">{kh.coGameKhachHang.toLocaleString()}</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">{(kh.coGameKhachHang * kh.khachHang.giaDo * kh.khachHang.giaGame).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tổng cộng Banh</TableCell>
                                        <TableCell align="center">{kh.tongCongBanh.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tỉ số</TableCell>
                                        <TableCell align="center">{kh.tiSoKhachHang.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Số đề</TableCell>
                                        <TableCell align="center">{kh.soDeKhachHang.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tiền ứng</TableCell>
                                        <TableCell align="center">{kh.tienUngKhachHang.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tiền góp</TableCell>
                                        <TableCell align="center">{kh.tienGopTuan.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tiền Cũ</TableCell>
                                        <TableCell align="center">{kh.tienCu.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tổng cộng khách hàng</TableCell>
                                        <TableCell align="center">{(kh.tongCongKhachHang ).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={5} style={{ fontWeight: 'bold' }}>Chung Chi</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold' }}>{kh.chungChi == null ? 0: kh.chungChi.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={5} style={{ fontWeight: 'bold' }}>Còn Lại</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold' }}>{((kh.tongCongKhachHang + kh.tienCu)-kh.chungChi).toLocaleString()}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default KhachHangSearch;
