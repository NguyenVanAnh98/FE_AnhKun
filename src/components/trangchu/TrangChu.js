import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Box mb={4}>
                <Typography
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    style={{ fontWeight: 'bold' }}
                >
                    TRANG CHỦ
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="row" height="50vh">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/khachhang')}
                    style={{ width: '20%' }}
                >
                    Khách Hàng
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/nguoitheo')}
                    style={{ width: '20%' }}
                >
                    Người Theo
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/loai')}
                    style={{ width: '20%' }}
                >
                    Loại
                </Button>
                
            </Box>
        </Container>
    );
};

export default HomePage;
