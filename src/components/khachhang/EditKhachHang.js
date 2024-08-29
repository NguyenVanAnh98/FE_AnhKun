import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Box
} from '@mui/material';
import { Add, Delete, AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';

const EditKhachHang = ({ id, onClose, onUpdate }) => {
    const [khachHang, setKhachHang] = useState(null);
    const [name, setName] = useState('');
    const [giaDo, setGiaDo] = useState('');
    const [giaBanh, setGiaBanh] = useState('');
    const [giaGame, setGiaGame] = useState('');
    const [loai, setLoai] = useState("");
    const [danhSachLoai, setDanhSachLoai] = useState([]);
    const [danhSachTheoXu, setDanhSachTheoXu] = useState([]);
    const [selectedTheoXu, setSelectedTheoXu] = useState([]);

    useEffect(() => {
        // Lấy thông tin khách hàng
        axios.get(`http://localhost:8080/api/khachhang/${id}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                
                setKhachHang(data);
                setName(data.name || '');
                setGiaDo(data.giaDo || '');
                setGiaBanh(data.giaBanh || '');
                setGiaGame(data.giaGame || '');
                setLoai(data.loai);
                setDanhSachTheoXu(data.theoXuKhachs || []);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
                alert('Có lỗi xảy ra khi lấy thông tin khách hàng: ' + error.message);
            });

        // Lấy danh sách loại
        // axios.get('http://localhost:8080/api/loai')
        //     .then(response => {
        //         setDanhSachLoai(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching Loai list:', error);
        //         alert('Có lỗi xảy ra khi lấy danh sách Loai: ' + error.message);
        //     });

        // // Lấy danh sách Theo Xu Khách
        // axios.get('http://localhost:8080/api/theoxukhach')
        //     .then(response => {
        //         setDanhSachTheoXu(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching Theo Xu Khach list:', error);
        //         alert('Có lỗi xảy ra khi lấy danh sách Theo Xu Khách: ' + error.message);
        //     });
    }, []);

    const handleUpdate = () => {
        const updatedKhachHang = {
            name,
            giaDo,
            giaBanh,
            giaGame,
            loai: danhSachLoai.find(loaiItem => loaiItem.tenLoai === loai),
            theoXuKhachs: selectedTheoXu
        };

        axios.put(`http://localhost:8080/api/khachhang/${id}`, updatedKhachHang)
            .then(() => {
                onUpdate(); // Notify parent component to refresh the list
                onClose();
            })
            .catch(error => {
                console.error('Error updating customer:', error);
                alert('Có lỗi xảy ra khi cập nhật khách hàng: ' + error.message);
            });
    };

    const handleTheoXuChange = (event, index) => {
        const { name, value } = event.target;
        const newTheoXu = [...selectedTheoXu];
        newTheoXu[index] = { ...newTheoXu[index], [name]: value };
        setSelectedTheoXu(newTheoXu);
    };

    const handleAddNguoiTheo = () => {
        setSelectedTheoXu([...selectedTheoXu, { idNguoiTheo: '', xuTheo: '' }]);
    };

    const handleRemoveNguoiTheo = (index) => {
        const newTheoXu = selectedTheoXu.filter((_, i) => i !== index);
        setSelectedTheoXu(newTheoXu);
    };

    if (!khachHang) return null; // or a loading spinner

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Sửa Khách Hàng</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Chỉnh sửa thông tin khách hàng
                </Typography>
                <TextField
                    label="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Giá Đồ"
                    type="number"
                    value={giaDo}
                    onChange={(e) => setGiaDo(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Giá Bánh"
                    type="number"
                    value={giaBanh}
                    onChange={(e) => setGiaBanh(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Giá Game"
                    type="number"
                    value={giaGame}
                    onChange={(e) => setGiaGame(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Loại"
                    value={loai.tenLoai}
                    fullWidth
                    margin="normal"
                    disabled
                />

                {/* <FormControl fullWidth margin="normal">
                    <InputLabel>Loại</InputLabel>
                    
                        
                            <MenuItem key={item.id} value={item.tenLoai}>
                                {item.tenLoai}
                            </MenuItem>
                        
                </FormControl> */}

                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Danh Sách Theo Xu Khách
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Người Theo</TableCell>
                            <TableCell>Xu Theo</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {danhSachTheoXu.map((xuKhach, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <FormControl fullWidth margin="dense">
                                    <TextField
                                        name="người theo"
                                        type="text"
                                        value={xuKhach.tenKhachTheo}
                                        onChange={(e) => handleTheoXuChange(e, index)}
                                        fullWidth
                                        disabled
                                    />
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="xuTheo"
                                        type="number"
                                        value={xuKhach.xuTheo}
                                        onChange={(e) => handleTheoXuChange(e, index)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleRemoveNguoiTheo(index)} color="error">
                                        <RemoveCircleIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Button onClick={handleAddNguoiTheo} startIcon={<AddCircleIcon />}>
                                    Thêm Người Theo
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Cập Nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditKhachHang;
