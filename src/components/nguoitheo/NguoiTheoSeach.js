import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, MenuItem, Box, Typography, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const NguoiTheoSearch = () => {
    const [nguoiTheoList, setNguoiTheoList] = useState([]);
    const [selectedNguoiTheo, setSelectedNguoiTheo] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [customers, setCustomers] = useState("");
    const [khachHang, setKhachHang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customer1, setCustomers1] = useState("");
    const [nguoiTheo, setNguoiTheo] = useState("");
    const [chungChiDetails, setChungChiDetails] = useState([]);
    const [openChungChiModal, setOpenChungChiModal] = useState(false);

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
            // Gọi API lấy dữ liệu chi tiết
            axios.get(`http://localhost:8080/api/nguoitheo/${selectedNguoiTheo}/detail/${selectedDate}`)
                .then(res => {
                    setCustomers(res.data);
                    setKhachHang(res.data.khachHangList);
                    setLoading(false);
                })
                .catch(err => console.error('Error fetching customer details', err));

            axios.get(`http://localhost:8080/api/tongtiennguoitheo/${selectedNguoiTheo}/${selectedDate}`)
                .then(res1 => {
                    setCustomers1(res1.data);
                    setLoading(false);
                })
                .catch(err => console.error('Error fetching financial details', err));
        } else {
            alert('Vui lòng chọn người theo và ngày kiểm tra.');
        }
    };

    const handleChungChiDetails = () => {
        axios.get(`http://localhost:8080/api/chungchinguoitheo/details/19`)
            .then(res => {
                setChungChiDetails(res.data);
                setOpenChungChiModal(true); // Mở modal khi có dữ liệu
            })
            .catch(err => console.error('Error fetching chung chi details', err));
    };

    const handleCloseModal = () => {
        setOpenChungChiModal(false);
    };

    // Hàm để định dạng số thành dạng có dấu phẩy và làm tròn
    const formatNumber = (num) => {
        if (!num) return '0';
        return Math.round(num).toLocaleString('vi-VN');
    };

    return (
        <>
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
                    <Button variant="contained" color="secondary" onClick={handleChungChiDetails} style={{ marginLeft: '10px' }}>
                        Chi Tiết Chung Chi
                    </Button>
                </Box>
            </Container>

            <TableContainer component={Paper}>
                {khachHang.map((kh, index) => (
                    <Table key={index}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" rowSpan={3}>Khách hàng</TableCell>
                                <TableCell align="center" colSpan={3}>Giá</TableCell>
                                <TableCell align="center" colSpan={4} rowSpan={2}>Thành tiền</TableCell>
                                <TableCell align="center" colSpan={2}>Tên người theo</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Giá banh</TableCell>
                                <TableCell align="center">Cò banh</TableCell>
                                <TableCell align="center">Cò game</TableCell>
                                <TableCell align="center">{customers.name}</TableCell>
                                <TableCell align="center">{kh.xuTheo}</TableCell>
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
                                <TableCell align="center" rowSpan={9} colSpan={2}>{formatNumber(kh.tinhtien[0].tongCongBanh / kh.giaDo * kh.xuTheo)}</TableCell>
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
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].coGameKhachHang * kh.giaDo * kh.giaGame)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" colSpan={3}>Tổng cộng Banh</TableCell>
                                <TableCell align="center">{formatNumber(kh.tinhtien[0].tongCongBanh)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                ))}
                <Table>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>Tổng Tiền</TableCell>
                        <TableCell align="center">{formatNumber(customer1.tongTienNguoiTheo)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>Chung Chi</TableCell>
                        <TableCell align="center">{formatNumber(customer1.chungChiNguoiTheo)}</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" colSpan={3}>Tiền Cũ</TableCell>
                        <TableCell align="center">{formatNumber(customer1.tienCuNguoiTheo)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>Còn lại</TableCell>
                        <TableCell align="center">{formatNumber(customer1.tienConLaiNguoiTheo)}</TableCell>
                    </TableRow>
                </Table>
            </TableContainer>

            {/* Modal for Chung Chi Details */}
            <Modal
                open={openChungChiModal}
                onClose={handleCloseModal}
            >
                <div style={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '100px', width: '80%', borderRadius: '8px' }}>
                    <Typography variant="h6" gutterBottom>Chi Tiết Chung Chi</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                
                                <TableCell>Số Tiền</TableCell>
                                <TableCell>Ngày</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chungChiDetails.map((item, index) => (
                                <TableRow key={index}>
                                   
                                    <TableCell>{formatNumber(item.chungChiNguoiTheo)}</TableCell>
                                    <TableCell>{item.ngayChungChi}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" color="secondary" onClick={handleCloseModal} style={{ marginTop: '20px' }}>
                        Đóng
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default NguoiTheoSearch;
