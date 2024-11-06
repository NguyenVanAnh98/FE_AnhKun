import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, MenuItem, Box, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
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

const ChungChiKhachHang = () => {
    const [khachHangList, setKhachHangList] = useState([]);
    const [selectedKhachHang, setSelectedKhachHang] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [khachHangDetails, setKhachHangDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chungchi, setChungchi] = useState("")
    const navigate = useNavigate()

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
        if (selectedKhachHang) {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8080/api/tinhtien/${selectedKhachHang}/kh`);
                console.log(res.data); // Kiểm tra dữ liệu nhận được
                setKhachHangDetails(res.data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                alert('Có lỗi xảy ra khi lấy chi tiết khách hàng: ' + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Vui lòng chọn khách hàng và ngày kiểm tra.');
        }
    };
    const handlesaveChungchi = () => {
        axios.put(`http://localhost:8080/api/tinhtien/${selectedKhachHang}/kh`, { chungchi })
            .then(() => {
                alert("Lưu thành công");
                navigate("/khachhang");
            })
            .catch(error => {
                console.error('Error saving Chung Chi:', error);
                alert("Có lỗi xảy ra khi lưu chứng chỉ.");
            });
        console.log(chungchi);
    }
    

    return (
        <>
            <Container>
                <Box mb={2}>
                    <Typography variant="h5" align="center" color="textPrimary">
                        CHUNG CHI KHÁCH HÀNG
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
                    label="Tiền chung chi"
                    type="number"
                    value={chungchi}
                    onChange={(e) => setChungchi(e.target.value )}
                    fullWidth
                    variant="outlined"
                />
                
                </Box>
                <Box mb={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Tìm Kiếm
                    </Button>
                </Box>
            </Container>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" rowSpan={3}>Khách hàng</TableCell>
                            <TableCell align="center" colSpan={3}>Giá</TableCell>
                            <TableCell align="center" colSpan={4} rowSpan={2}>Thành tiền</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Giá Banh</TableCell>
                            <TableCell align="center">Cò Banh</TableCell>
                            <TableCell align="center">Cò Game</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> 
                         {khachHangDetails == null ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Không có dữ liệu để hiển thị</TableCell>
                            </TableRow>
                        ) : (
                                <React.Fragment >
                                    <TableRow>
                                        <TableCell rowSpan={9}>{khachHangDetails.khachHang.name}</TableCell>
                                        <TableCell align="center" rowSpan={9}>{khachHangDetails.khachHang.giaBanh.toLocaleString()}</TableCell>
                                        <TableCell align="center" rowSpan={9}>{khachHangDetails.khachHang.giaDo.toLocaleString()}</TableCell>
                                        <TableCell align="center" rowSpan={9}>{khachHangDetails.khachHang.giaGame.toLocaleString()}</TableCell>
                                        <TableCell align="center">Ăn thua</TableCell>
                                        <TableCell align="center">{khachHangDetails.anThuaKhachHang.toLocaleString() }</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">{((khachHangDetails.khachHang.giaDo * khachHangDetails.anThuaKhachHang)*1000).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Cỏ Banh</TableCell>
                                        <TableCell align="center">{khachHangDetails.coBanhKhachHang.toLocaleString()}</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">{(khachHangDetails.khachHang.giaBanh*khachHangDetails.khachHang.giaDo*khachHangDetails.coBanhKhachHang).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Cò Game</TableCell>
                                        <TableCell align="center">{khachHangDetails.coGameKhachHang.toLocaleString()}</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">{(khachHangDetails.coGameKhachHang * khachHangDetails.khachHang.giaDo * khachHangDetails.khachHang.giaGame).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tổng cộng Banh</TableCell>
                                        <TableCell align="center">{khachHangDetails.tongCongBanh.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tỉ số</TableCell>
                                        <TableCell align="center">{khachHangDetails.tiSoKhachHang.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Số đề</TableCell>
                                        <TableCell align="center">{khachHangDetails.soDeKhachHang.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tiền ứng</TableCell>
                                        <TableCell align="center">{khachHangDetails.tienUngKhachHang.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tiền góp</TableCell>
                                        <TableCell align="center">{khachHangDetails.tienGopTuan.toLocaleString()}</TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tổng cộng khách hàng</TableCell>
                                        <TableCell align="center">{(khachHangDetails.tongCongKhachHang).toLocaleString()}</TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Tiền cũ</TableCell>
                                        <TableCell align="center">{(khachHangDetails.tienCu).toLocaleString()}</TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Còn Lại</TableCell>
                                        <TableCell align="center">{(khachHangDetails.conLai).toLocaleString()}</TableCell>
                                        
                                    </TableRow>
                                </React.Fragment>
                            
                        )}
                    </TableBody>
                </Table>

                <Box mb={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handlesaveChungchi}>
                        Lưu
                    </Button>
                </Box>
            </TableContainer>
        </>
    );
};

export default ChungChiKhachHang;
