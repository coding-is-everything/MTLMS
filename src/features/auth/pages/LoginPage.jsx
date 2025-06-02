import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    // Application name can be customized here or fetched from config
    const appName = 'Lawyer Portal';

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Box sm={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" compoent="h1" gutterBottom>
                                {appName}
                            </Typography>
                            <Typography color="text.secondary">
                                Sign in to your account
                            </Typography>
                        </Box>
                        <LoginForm />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}