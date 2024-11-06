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

const ChungChiCoDong = () => {
    const [coDongList, setCoDongList] = useState([]);
    const [selectedCoDong, setSelectedCoDong] = useState('');
    const [chungchi, setChungchi] = useState("");
    const [tongTienCoDong, setTongTienCoDong] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/codong')
            .then(response => {
                setCoDongList(response.data);
            })
            .catch(error => {
                console.error('Error fetching shareholders:', error);
                alert('Có lỗi xảy ra khi lấy danh sách cổ đông: ' + error.message);
            });
    }, []);

    const handleSearch = () => {
        if (selectedCoDong) {
            setLoading(true);
            axios.get(`http://localhost:8080/api/tongtiencodong/${selectedCoDong}/tcd`)
                .then(res1 => {
                    setTongTienCoDong(res1.data);
                    setLoading(false);
                    console.log(res1.data);
                })
                .catch(error => {
                    setLoading(false);
                    console.error('Error fetching shareholder details:', error);
                    alert('Có lỗi xảy ra khi tìm kiếm.');
                });
        } else {
            alert('Vui lòng chọn cổ đông');
        }
    };

    const handlesaveChungchi = () => {
        axios.post(`http://localhost:8080/api/chungchicodong/save/${selectedDate}/${chungchi}/${tongTienCoDong.id}`)
            .then(() => {
                alert("Lưu thành công");
                navigate("/codong");
            })
            .catch(error => {
                console.error('Error saving certificate:', error);
                alert("Có lỗi xảy ra khi lưu chứng chỉ.");
            });
        console.log(tongTienCoDong);
    };

    return (
        <>
            <Container>
                <Box mb={2}>
                    <Typography variant="h5" align="center" color="textPrimary">
                        CHỨNG CHỈ CỔ ĐÔNG
                    </Typography>
                </Box>
                <Box mb={2}>
                    <TextField
                        select
                        label="Chọn Cổ Đông"
                        value={selectedCoDong}
                        onChange={(e) => setSelectedCoDong(e.target.value)}
                        fullWidth
                        variant="outlined"
                    >
                        {coDongList.map(codong => (
                            <MenuItem key={codong.id} value={codong.id}>
                                {codong.name}
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
                        {tongTienCoDong === null ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Không có dữ liệu để hiển thị</TableCell>
                            </TableRow>
                        ) : (
                            <>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Tổng tiền</TableCell>
                                    <TableCell align="center">{tongTienCoDong?.tongTienCoDong?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Tiền Cũ</TableCell>
                                    <TableCell align="center">{tongTienCoDong?.tienCuCoDong?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Tổng Chung Chi</TableCell>
                                    <TableCell align="center">{tongTienCoDong?.chungChiCoDong?.toLocaleString() || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>Còn Lại</TableCell>
                                    <TableCell align="center">{tongTienCoDong?.tienConLaiCoDong?.toLocaleString() || 'N/A'}</TableCell>
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

export default ChungChiCoDong;
