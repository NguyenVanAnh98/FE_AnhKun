import React, { useState, useEffect } from 'react';
import {
    Button, Container, TextField, MenuItem, Box, Typography, Modal, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';

const CodongSearch = () => {
    const [codongList, setCodongList] = useState([]);
    const [selectedCodong, setSelectedCodong] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [customers, setCustomers] = useState('');
    const [khachHang, setKhachHang] = useState([]);
    const [customer1, setCustomers1] = useState('');
    const [chungChiCoDongDetails, setChungChiCoDongDetails] = useState([]);
    const [openChungChiModal, setOpenChungChiModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/codong')
            .then(response => {
                setCodongList(response.data);
            })
            .catch(error => {
                console.error('Error fetching codong:', error);
                alert('Có lỗi xảy ra khi lấy danh sách cổ đông: ' + error.message);
            });
    }, []);

    const handleSearch = () => {
        if (selectedCodong && selectedDate) {
            setLoading(true);
            axios.get(`http://localhost:8080/api/codong/${selectedCodong}/detail/${selectedDate}`)
                .then(res => {
                    setCustomers(res.data);
                    setKhachHang(res.data.khachHangList);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching customer details', err);
                    setLoading(false);
                });

            axios.get(`http://localhost:8080/api/tongtiencodong/${selectedCodong}/${selectedDate}`)
                .then(res1 => {
                    setCustomers1(res1.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching financial details', err);
                    setLoading(false);
                });
        } else {
            alert('Vui lòng chọn cổ đông và ngày kiểm tra.');
        }
    };

    const handleChungChiCoDongDetails = () => {
        axios.get(`http://localhost:8080/api/chungchicodong/details/4`)
            .then(res => {
                setChungChiCoDongDetails(res.data);
                setOpenChungChiModal(true);
            })
            .catch(err => console.error('Error fetching chung chi details', err));
    };

    const handleCloseModal = () => {
        setOpenChungChiModal(false);
    };

    const formatNumber = (num) => {
        if (!num) return '0';
        return Math.round(num).toLocaleString('vi-VN');
    };


    return (
        <Container>
            <Box mb={2} textAlign="center">
                <Typography variant="h5" color="textPrimary">
                    Tìm Kiếm Chi Tiết Tính Tiền Cổ Đông
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField
                    select
                    label="Chọn Cổ Đông"
                    value={selectedCodong}
                    onChange={(e) => setSelectedCodong(e.target.value)}
                    fullWidth
                    variant="outlined"
                >
                    {codongList.map(codong => (
                        <MenuItem key={codong.id} value={codong.id}>
                            {codong.name}
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
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
            <Box mb={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Tìm Kiếm
                </Button>
                <Button variant="contained" color="secondary" onClick={handleChungChiCoDongDetails} style={{ marginLeft: '10px' }}>
                    Chi Tiết Chung Chi
                </Button>
            </Box>

            <TableContainer component={Paper}>
                {khachHang.map((kh, index) => (
                    <Table key={index}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" rowSpan={3}>Khách hàng</TableCell>
                                <TableCell align="center" colSpan={3}>Giá</TableCell>
                                <TableCell align="center" colSpan={4}>Thành tiền</TableCell>
                                <TableCell align="center" colSpan={2}>Tên cổ đông</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Giá banh</TableCell>
                                <TableCell align="center">Cò banh</TableCell>
                                <TableCell align="center">Cò game</TableCell>
                                <TableCell align="center">{customers.name}</TableCell>
                                <TableCell align="center">{kh.phanTramTheo}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={9}>{kh.name}</TableCell>
                                <TableCell align="center" rowSpan={9}>{formatNumber(kh.giaBanh)}</TableCell>
                                <TableCell align="center" rowSpan={9}>{formatNumber(kh.giaDo)}</TableCell>
                                <TableCell align="center" rowSpan={9}>{formatNumber(kh.giaGame)}</TableCell>
                                <TableCell align="center">Ăn thua</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].anThuaKhachHang)}</TableCell>
                                <TableCell align="center">Mô tả</TableCell>
                                <TableCell align="center">{formatNumber(kh.giaDo * kh.tinhtien[0].anThuaKhachHang * 1000)}</TableCell>
                                <TableCell align="center" rowSpan={9} colSpan={2}>{formatNumber(kh.tinhtien[0].tienLoiLo / 100 * kh.phanTramTheo)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Cỏ Banh</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].coBanhKhachHang)}</TableCell>
                                <TableCell align="center">Mô tả</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].coBanhKhachHang * kh.giaDo * kh.giaBanh)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Cỏ Game</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].coGameKhachHang)}</TableCell>
                                <TableCell align="center">Mô tả</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].tienLoiLo / 100 * kh.phanTramTheo)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" colSpan={3}>Tổng cộng Banh</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].tongCongBanh)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                ))}
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" colSpan={3} style={{ fontWeight: "bold", color: "black" }}>
                                Tiền Cũ
                            </TableCell>
                            <TableCell align="center">{formatNumber(customer1.tienCuCoDong)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" colSpan={3} style={{ fontWeight: "bold", color: "black" }}>
                                Chung Chi
                            </TableCell>
                            <TableCell align="center">{formatNumber(customer1.chungChiCoDong || 0)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" colSpan={3} style={{ fontWeight: "bold", color: "black" }}>
                                Còn Lại
                            </TableCell>
                            <TableCell align="center">{formatNumber(customer1.tienConLaiCoDong)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openChungChiModal} onClose={handleCloseModal}>
                <Box sx={{ padding: '20px', backgroundColor: 'white', margin: 'auto', mt: 10, width: '80%', borderRadius: 2 }}>
                    <Typography variant="h6" mb={2}>
                        Chi Tiết Chung Chi Cổ Đông
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Số Tiền</TableCell>
                                    <TableCell align="center">Ngày Chung Chi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chungChiCoDongDetails.map((detail, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{formatNumber(detail.chungChiCoDong)}</TableCell>
                                        <TableCell align="center">{detail.ngayChungChi}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </Container>
    );
};

export default CodongSearch;
