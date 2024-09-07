import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MuiTable = () => {
  const [customers, setCustomers] = useState("");
  const [khachHang, setKhachHang] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  console.log(customers,"dulieunguoitheo------------------------");
  
  console.log(khachHang, "dulieukhachahng-----------------------");
  useEffect(() => {
    axios.get(`http://localhost:8080/api/nguoitheo/1/detail/2006-07-09`)
      .then(res => {
        
        setCustomers(res.data);
        setKhachHang(res.data.khachHangList);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!customers || !khachHang.length) {
    return <div>No data available</div>;
  }


  return (
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
                <TableRow>
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
                </TableRow>
              
            </React.Fragment>
          
        </TableBody>
      </Table>
      ))}
    </TableContainer>
  );

};
export default MuiTable;
