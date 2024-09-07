import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, MenuItem, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'react-hook-form';
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
    const navigate = useNavigate();
    const [customers, setCustomers] = useState("");
  const [khachHang, setKhachHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            setCustomers(res.data)
            setKhachHang(res.data.khachHangList)
            setLoading(false);
           });
           console.log(selectedDate,selectedNguoiTheo);
           
        } else {
            alert('Vui lòng chọn người theo và ngày kiểm tra.');
        }
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
            </Box>
        </Container>
        <TableContainer component={Paper}>
        {khachHang.map((kh, index) => (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={3}>Khách hàng</TableCell>
              <TableCell align="center" colSpan={3}>Giá</TableCell>
              <TableCell align="center" colSpan={4} rowSpan={2}>Thành tiền</TableCell>
              <TableCell align="center" colSpan={2} >Tên người theo</TableCell>
              
            </TableRow>
            <TableRow>
              <TableCell align="center">giá banh</TableCell>
              <TableCell align="center">cò banh</TableCell>
              <TableCell align="center">cò game</TableCell>
              <TableCell align="center" >{customers.name}</TableCell>
              <TableCell align="center" >{kh.xuTheo}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell rowSpan={9}>{kh.name}</TableCell>
                  <TableCell align="center" rowSpan={9}>{kh.giaBanh}</TableCell>
                  <TableCell align="center" rowSpan={9}>{kh.giaDo}</TableCell>
                  <TableCell align="center" rowSpan={9}>{kh.giaGame}</TableCell>
                  <TableCell align="center">Ăn thua</TableCell>
                  <TableCell align="center">{kh.tinhtien[0].anThuaKhachHang}</TableCell>
                  <TableCell align="center">Mô tả</TableCell>
                  <TableCell align="center">{kh.giaDo * kh.tinhtien[0].anThuaKhachHang}</TableCell>
                  <TableCell align="center" rowSpan={9} colSpan={2}>{kh.tinhtien[0].tongCongBanh/kh.giaDo * kh.xuTheo}</TableCell>
                </TableRow>
                
                  <TableRow >
                    <TableCell align="center">Cỏ Banh</TableCell>
                    <TableCell align="center">{kh.tinhtien[0].coBanhKhachHang}</TableCell>
                    <TableCell align="center"  >mô tả </TableCell>
                    <TableCell align="center">{kh.tinhtien[0].coBanhKhachHang * kh.giaDo * kh.giaBanh}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell align="center">Cỏ Game</TableCell>
                    <TableCell align="center">{kh.tinhtien[0].coGameKhachHang}</TableCell>
                    <TableCell align="center"  >mô tả </TableCell>
                    <TableCell align="center">{kh.tinhtien[0].coGameKhachHang * kh.giaDo * kh.giaGame}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={3}> Tổng cộng Banh</TableCell>
                    <TableCell align="center"> {kh.tinhtien[0].tongCongBanh}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell align="center" colSpan={3}> Tỉ số</TableCell>
                    <TableCell align="center"> {kh.tinhtien[0].tiSoKhachHang}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={3}> Số đề</TableCell>
                    <TableCell align="center"> {kh.tinhtien[0].soDeKhachHang}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={3}> Tiền ứng</TableCell>
                    <TableCell align="center"> {kh.tinhtien[0].tienUngKhachHang}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={3}> Tiền góp</TableCell>
                    <TableCell align="center"> {kh.tinhtien[0].tienGopTuan}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={3}> Tổng cộng khách hàng</TableCell>
                    <TableCell align="center"> {kh.tinhtien[0].tongCongKhachHang}</TableCell>
                  </TableRow> */}
                
              </React.Fragment>
            
          </TableBody>
        </Table>
        ))}
      </TableContainer>
      </>
    );
};

export default NguoiTheoSearch;
