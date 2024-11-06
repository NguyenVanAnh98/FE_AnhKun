import React, { useState, useEffect } from 'react';
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
        theoXuKHReqDTOS: [{ idNguoiTheo: '', xuTheo: '' }],
        phanTramCoDongReqDTOS: [{ idCoDong: '', phanTramTheo: '', tenCoDong: '' }]
    });

    const [nguoiTheoList, setNguoiTheoList] = useState([]);
    const [coDongList, setCoDongList] = useState([]);

    useEffect(() => {
        const fetchNguoiTheoList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/nguoitheo');
                setNguoiTheoList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người theo:', error);
                alert('Không thể lấy danh sách người theo. Vui lòng thử lại sau.');
            }
        };

        const fetchCoDongList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/codong');
                setCoDongList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách cổ đông:', error);
                alert('Không thể lấy danh sách cổ đông. Vui lòng thử lại sau.');
            }
        };

        fetchNguoiTheoList();
        fetchCoDongList();
    }, []);

    const handleInputChange = (index, e, field) => {
        const { name, value } = e.target;
        const updatedData = [...formData[field]];
        updatedData[index] = { ...updatedData[index], [name]: value };
        setFormData(prevState => ({ ...prevState, [field]: updatedData }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddRow = (field, defaultValue) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: [...prevState[field], defaultValue]
        }));
    };

    const handleRemoveRow = (index, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: prevState[field].filter((_, i) => i !== index)
        }));
    };

    const validateFormData = () => {
        const { maKhachHang, name, loaiId, giaBanh, giaDo, giaGame, theoXuKHReqDTOS, phanTramCoDongReqDTOS } = formData;
        if (!maKhachHang || !name || !loaiId || !giaBanh || !giaDo || !giaGame) {
            alert("Vui lòng điền tất cả các trường bắt buộc.");
            return false;
        }

        for (const theoXu of theoXuKHReqDTOS) {
            if (!theoXu.idNguoiTheo || !theoXu.xuTheo) {
                alert("Vui lòng điền đầy đủ thông tin cho Người Theo.");
                return false;
            }
        }

        for (const coDong of phanTramCoDongReqDTOS) {
            if (!coDong.idCoDong || !coDong.phanTramTheo) {
                alert("Vui lòng điền đầy đủ thông tin cho Cổ Đông.");
                return false;
            }
        }

        return true;
    };

    const handleAddCustomer = async () => {
        if (!validateFormData()) return;

        try {
            await axios.post('http://localhost:8080/api/khachhang', formData);
            if (onAdd) onAdd(); // Đảm bảo onAdd tồn tại và là một hàm
            onClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('Lỗi khi thêm khách hàng:', error);
            alert(`Có lỗi xảy ra khi thêm khách hàng: ${errorMessage}`);
        }
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
                {/* Phần "Người Theo" */}
                <div>
                    {formData.theoXuKHReqDTOS.map((item, index) => (
                        <Box key={index} mb={2} display="flex" alignItems="center">
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Người Theo</InputLabel>
                                <Select
                                    name="idNguoiTheo"
                                    value={item.idNguoiTheo}
                                    onChange={(e) => handleInputChange(index, e, 'theoXuKHReqDTOS')}
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
                                onChange={(e) => handleInputChange(index, e, 'theoXuKHReqDTOS')}
                                style={{ marginLeft: 8 }}
                            />
                            <IconButton onClick={() => handleRemoveRow(index, 'theoXuKHReqDTOS')} color="error" style={{ marginLeft: 8 }}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        onClick={() => handleAddRow('theoXuKHReqDTOS', { idNguoiTheo: '', xuTheo: '' })}
                        color="primary"
                        startIcon={<AddCircleIcon />}
                    >
                        Thêm Người Theo
                    </Button>
                </div>
                {/* Phần "Cổ Đông" */}
                <div>
                    {formData.phanTramCoDongReqDTOS.map((item, index) => (
                        <Box key={index} mb={2} display="flex" alignItems="center">
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Cổ Đông</InputLabel>
                                <Select
                                    name="idCoDong"
                                    value={item.idCoDong}
                                    onChange={(e) => handleInputChange(index, e, 'phanTramCoDongReqDTOS')}
                                    label="Cổ Đông"
                                >
                                    {coDongList.map(coDong => (
                                        <MenuItem key={coDong.id} value={coDong.id}>
                                            {coDong.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                margin="dense"
                                name="phanTramTheo"
                                label="Phần Trăm Theo"
                                type="number"
                                variant="outlined"
                                value={item.phanTramTheo}
                                onChange={(e) => handleInputChange(index, e, 'phanTramCoDongReqDTOS')}
                                style={{ marginLeft: 8 }}
                            />
                            <IconButton onClick={() => handleRemoveRow(index, 'phanTramCoDongReqDTOS')} color="error" style={{ marginLeft: 8 }}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        onClick={() => handleAddRow('phanTramCoDongReqDTOS', { idCoDong: '', phanTramTheo: '' })}
                        color="primary"
                        startIcon={<AddCircleIcon />}
                    >
                        Thêm Cổ Đông
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleAddCustomer} color="primary">
                    Thêm Khách Hàng
                </Button>
            </DialogActions>
        </>
    );
};

export default ThemKhachHang;
