import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from "@mui/material";

// Import các component
import KhachHangList from './components/khachhang/KhachHangList';
import NguoiTheoList from './components/nguoitheo/NguoiTheoList'; // Đường dẫn tới component NguoiTheoList
import ThemKhachHang from './components/khachhang/ThemKhachHang'; // Đường dẫn tới component ThemKhachHang
import EditKhachHang from './components/khachhang/EditKhachHang'; // Đường dẫn tới component EditKhachHang
import ChiTietKhachHang from './components/khachhang/ChiTietKhachHang'; // Đường dẫn tới component ChiTietKhachHang
import ManageNguoiTheo from './components/nguoitheo/ManageNguoiTheo'; // Đường dẫn tới component ManageNguoiTheo
import LoaiList from './components/loai/LoaiList'; // Đường dẫn tới component LoaiList
import ManageLoai from './components/loai/MagageLoai';
import TheoXuKhachManager from "./components/theoxukhach/TheoXuKhachManager";
import EditTheoXuKhach from "./components/theoxukhach/EditTheoXuKhach";
import TheoXuKhachList from "./components/theoxukhach/TheoXuKhachList";
import ThemTheoXuKhach from "./components/theoxukhach/ThemTheoXuKhach";
import TinhTienIbet from './components/tinhtien/TinhTienIbet';
import TinhTienSbo from './components/tinhtien/TinhTienSbo';
import ChiTietTinhTienNguoiTheo from './components/tinhtien/ChiTietTinhTienNguoiTheo';
import TrangChu from './components/trangchu/TrangChu'
import NguoiTheoSearch from './components/nguoitheo/NguoiTheoSeach'

function App() {
    return (
        <Router>
            <Container>
                <Routes>
                <Route path="/" element={<TrangChu />} />
                    <Route path="/khachhang" element={<KhachHangList />} />
                    <Route path="/nguoitheo" element={<NguoiTheoList />} />
                    <Route path="/them-khach-hang" element={<ThemKhachHang />} />
                    <Route path="/edit-khach-hang/:id" element={<EditKhachHang />} />
                    <Route path="/chi-tiet-khach-hang/:id" element={<ChiTietKhachHang />} />
                    <Route path="/manage-nguoi-theo/:id" element={<ManageNguoiTheo />} />

                    {/* Route cho danh sách loại và các chức năng liên quan */}
                    <Route path="/loai" element={<LoaiList />} />
                    <Route path="/manage-loai/:id" element={<ManageLoai />} />
                    {/*<Route path="/theoxukhach" element={<TheoXuKhachManager />} />*/}
                    <Route path="/theoxukhach" element={<TheoXuKhachList />} />
                    <Route path="/them-theo-xu-khach" element={<ThemTheoXuKhach />} />
                    <Route path="/edit-theo-xu-khach/:id" element={<EditTheoXuKhach />} />
                    <Route path="/tinhtienIbet" element={<TinhTienIbet />} />
                    <Route path="/tinhtienSbo" element={<TinhTienSbo />} />
                    <Route path="/timkiemtinhtiennguoitheo" element={<NguoiTheoSearch />} />
                    <Route path="/chitiettinhtiennguoitheo" element={<ChiTietTinhTienNguoiTheo />} />

                </Routes>
            </Container>
        </Router>
    );
}

export default App;
