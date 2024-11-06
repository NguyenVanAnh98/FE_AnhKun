import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, MenuItem, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@mui/material';

const ChungChiNguoiTheo = () => {
    const [nguoiTheoList, setNguoiTheoList] = useState([]);
    const [selectedNguoiTheo, setSelectedNguoiTheo] = useState('');
    const [chungchi, setChungchi] = useState("");
    const [tongTienNguoiTheo, setTongTienNguoiTheo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate,setSelectedDate] = useState( '')

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
        if (selectedNguoiTheo) {
            setLoading(true);
            axios.get(`http://localhost:8080/api/tongtiennguoitheo/${selectedNguoiTheo}/tnt`)
                .then(res1 => {
                    setTongTienNguoiTheo(res1.data);
                    setLoading(false);
                    console.log(res1.data);
                })
                .catch(error => {
                    setLoading(false);
                    console.error('Error fetching customer details:', error);
                    alert('Có lỗi xảy ra khi tìm kiếm.');
                });
        } else {
            alert('Vui lòng chọn người theo');
        }
    };

    const handlesaveChungchi = () => {
        axios.post(`http://localhost:8080/api/chungchinguoitheo/save/${selectedDate}/${chungchi}/${tongTienNguoiTheo.id}`)
            .then(() => {
                alert("Lưu thành công");
                navigate("/khachhang");
            })
            .catch(error => {
                console.error('Error saving Chung Chi:', error);
                alert("Có lỗi xảy ra khi lưu chứng chỉ.");
            });
        console.log(tongTienNguoiTheo);

    };

    return (
        <>
            <Container>
                <Box mb={2}>
                    <Typography variant="h5" align="center" color="textPrimary">
                        CHUNG CHI NGƯỜI THEO
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
                        {nguoiTheoList.map(nguoitheo => (
                            <MenuItem key={nguoitheo.id} value={nguoitheo.id}>
                                {nguoitheo.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Tiền chung chi"
                        type="number"
                        value={chungchi}
                        onChange={(e) => setChungchi(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <Box>
                <TextField
                        label="Ngày Chung Chi"
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
                <Table>
                    <TableBody>
                        {tongTienNguoiTheo === null ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Không có dữ liệu để hiển thị</TableCell>
                            </TableRow>
                        ) : (
                            <>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Tổng tiền </TableCell>
                                    <TableCell align="center">{tongTienNguoiTheo?.tongTienNguoiTheo?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Tiền Cũ</TableCell>
                                    <TableCell align="center">{tongTienNguoiTheo?.tienCuNguoiTheo?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Tổng Chung Chi</TableCell>
                                    <TableCell align="center">{tongTienNguoiTheo?.chungChiNguoiTheo?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Còn Lại</TableCell>
                                    <TableCell align="center">{tongTienNguoiTheo?.tienConLaiNguoiTheo?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                            </>
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

export default ChungChiNguoiTheo;
