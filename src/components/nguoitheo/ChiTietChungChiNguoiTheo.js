// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Button
// } from '@mui/material';

// const ChiTietChungChiNguoiTheo = ({ nguoiTheoId, onClose }) => {
//     const [chungChiDetails, setChungChiDetails] = useState([]);

//     useEffect(() => {
//         if (nguoiTheoId) {
//             axios.get(`http://localhost:8080/api/chungchinguoitheo/details/${nguoiTheoId}`)
//                 .then(response => {
//                     setChungChiDetails(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching chung chi details:', error);
//                     alert('Có lỗi xảy ra khi lấy thông tin chung chi: ' + error.message);
//                 });
//         }
//     }, [nguoiTheoId]);

//     if (!nguoiTheoId) {
//         return null;
//     }

//     return (
//         <Dialog open={Boolean(nguoiTheoId)} onClose={onClose} fullWidth maxWidth="md">
//             <DialogTitle>Chi Tiết Chung Chi Người Theo</DialogTitle>
//             <DialogContent>
//                 <Typography variant="h6" gutterBottom>
//                     Danh Sách Chung Chi
//                 </Typography>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Ngày Chung Chi</TableCell>
//                             <TableCell>Thành Tiền</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {chungChiDetails.length > 0 ? (
//                             chungChiDetails.map((detail, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell>{detail.ngayChungChi}</TableCell>
//                                     <TableCell>{detail.thanhTien}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={2}>Không có thông tin chung chi</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="primary">
//                     Đóng
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default ChiTietChungChiNguoiTheo;
