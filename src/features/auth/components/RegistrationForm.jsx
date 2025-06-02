import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Divider,
    Alert,
    Grid,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Email,
    Lock,
    Person,
    Visibility,
    VisibilityOff,
    Business,
    Phone
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        firmName: '',
        password: '',
        confirmPassword: '',
        showPassword: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </Grid>
            </Grid>

            <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Law Firm Name"
                name="firmName"
                value={formData.firmName}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <Business sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={formData.showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type={formData.showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
                {loading ? 'Creating Account...' : 'Creating Account'}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link href="/login" variant="body2">
                        Sign In
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}