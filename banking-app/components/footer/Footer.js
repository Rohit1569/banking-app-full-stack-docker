import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <Container maxWidth="lg">
                <Box py={3}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        © 2023 Copyright:
                        <Link color="textPrimary" href="#">
                            BankingApp.com
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;
