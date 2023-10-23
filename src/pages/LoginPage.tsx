import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container } from '@mui/material';
import { getUser } from '../api/users';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const defaultUser = 'Samantha';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getUser(defaultUser)
      .then(response => {
        if (response.data.length === 1) {
          localStorage.setItem('user', JSON.stringify(response.data[0]));
          navigate('/feeds');
          return;
        }
      });
  };

  return (
    <Container maxWidth="xs" sx={{ marginBlock: '120px' }}>
      <Typography variant="h3" color='primary' sx={{ marginBottom: '16px' }}>
        Welcome
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size='large'
          fullWidth
          sx={{ marginTop: '30px' }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};