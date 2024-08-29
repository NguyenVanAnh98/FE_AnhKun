import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    IconButton,
    Box
} from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';

const ThemKhachHang = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        maKhachHang: '',
        name: '',
        loaiId: '',
        giaBanh: '',
        giaDo: '',
        giaGame: '',
        theoXuKHReqDTOS: [{ idNguoiTheo: '', xuTheo: '' }]
    });

    const [nguoiTheoList, setNguoiTheoList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/nguoitheo')
            .then(response => setNguoiTheoList(response.data))
            .catch(error => console.error('Error fetching nguoi theo list:', error));
    }, []);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTheoXuKH = [...formData.theoXuKHReqDTOS];
        updatedTheoXuKH[index] = { ...updatedTheoXuKH[index], [name]: value };
        setFormData(prevState => ({ ...prevState, theoXuKHReqDTOS: updatedTheoXuKH }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddNguoiTheo = () => {
        setFormData(prevState => ({
            ...prevState,
            theoXuKHReqDTOS: [...prevState.theoXuKHReqDTOS, { idNguoiTheo: '', xuTheo: '' }]
        }));
    };

    const handleRemoveNguoiTheo = (index) => {
        setFormData(prevState => ({
            ...prevState,
            theoXuKHReqDTOS: prevState.theoXuKHReqDTOS.filter((_, i) => i !== index)
        }));
    };

    const handleAddCustomer = () => {
        const { maKhachHang, name, loaiId, giaBanh, giaDo, giaGame } = formData;
        if (!maKhachHang || !name || !loaiId || !giaBanh || !giaDo || !giaGame) {
            alert("Vui lòng điền tất cả các trường bắt buộc.");
            return;
        }

        axios.post('http://localhost:8080/api/khachhang', formData)
            .then(() => {
                onAdd();
                onClose();
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || error.message;
                console.error('API request failed:', error);
                alert(`Có lỗi xảy ra khi thêm khách hàng: ${errorMessage}`);
            });
    };

    return (
        <>
            <DialogTitle>Thêm Khách Hàng</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="maKhachHang"
                    label="Mã Khách Hàng"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.maKhachHang}
                    onChange={handleFormChange}
                />
                <TextField
                    margin="dense"
                    name="name"
                    label="Tên"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleFormChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Loại</InputLabel>
                    <Select
                        name="loaiId"
                        value={formData.loaiId}
                        onChange={handleFormChange}
                        label="Loại"
                    >
                        <MenuItem value={1}>IBET</MenuItem>
                        <MenuItem value={2}>SBO</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="giaBanh"
                    label="Giá Banh"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.giaBanh}
                    onChange={handleFormChange}
                />
                <TextField
                    margin="dense"
                    name="giaDo"
                    label="Giá Đồ"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.giaDo}
                    onChange={handleFormChange}
                />
                <TextField
                    margin="dense"
                    name="giaGame"
                    label="Giá Game"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.giaGame}
                    onChange={handleFormChange}
                />
                
                <div>
                    {formData.theoXuKHReqDTOS.map((item, index) => (
                        <Box key={index} mb={2} display="flex" alignItems="center">
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Người Theo</InputLabel>
                                <Select
                                    name="idNguoiTheo"
                                    value={item.idNguoiTheo}
                                    onChange={(e) => handleInputChange(index, e)}
                                    label="Người Theo"
                                >
                                    {nguoiTheoList.map(nguoiTheo => (
                                        <MenuItem key={nguoiTheo.id} value={nguoiTheo.id}>
                                            {nguoiTheo.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                margin="dense"
                                name="xuTheo"
                                label="Xu Theo"
                                type="number"
                                variant="outlined"
                                value={item.xuTheo}
                                onChange={(e) => handleInputChange(index, e)}
                                style={{ marginLeft: 8 }}
                            />
                            <IconButton onClick={() => handleRemoveNguoiTheo(index)} color="error" style={{ marginLeft: 8 }}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        onClick={handleAddNguoiTheo}
                        color="primary"
                        startIcon={<AddCircleIcon />}
                    >
                        Thêm Người Theo
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleAddCustomer} color="primary">
                    Thêm
                </Button>
            </DialogActions>
        </>
    );
};

export default ThemKhachHang;
