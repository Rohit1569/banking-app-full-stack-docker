import React, { useState } from 'react';
import { CreateUser as Create } from '../service/createUser';
import ValidationError from '@/components/errors/ValidationError';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';

const Createuser = ({ handleLogin }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleCreate = async (e) => {
        try {
            e.preventDefault();
            if (name === '' || /\d+/.test(name)) {
                throw new ValidationError('Invalid first name');
            }

            if (username === '') {
                throw new ValidationError('Please enter username');
            }

            if (password === '') {
                throw new ValidationError('Please enter a valid password');
            }

            if (username.length !== 0) {
                throw new ValidationError('Username already taken');
            }

            const res = await Create(name, age, gender, username, password);
            enqueueSnackbar('Account Created', { variant: 'success' });
            console.log(res);
        } catch (error) { }
    }
    const getName = (e) => {
        setName(e.target.value);
    };

    const getAge = (e) => {
        setAge(e.target.value);
    };

    const getGender = (e) => {
        setGender(e.target.value);
    };

    const getUsername = (e) => {
        setUsername(e.target.value);
    };

    const getPassword = (e) => {
        setPassword(e.target.value);
    };

    const getEmail = (e) => {
        setEmail(e.target.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography component="h1" variant="h5">
                    Create User
                </Typography>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Enter Your Name"
                                name="name"
                                onChange={getName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="age"
                                label="Enter Your Age"
                                name="age"
                                onChange={getAge}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="gender"
                                label="Enter Your Gender"
                                name="gender"
                                onChange={getGender}
                            /> */}
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="gender"
                                label="Enter Your Gender"
                                name="gender"
                                select
                                value={gender}
                                onChange={getGender}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Enter Your Username"
                                name="username"
                                onChange={getUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Enter Your Email"
                                name="email"
                                onChange={getEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Enter Your Password"
                                type="password"
                                id="password"
                                onChange={getPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleCreate}
                    >
                        Create Account
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Createuser;
