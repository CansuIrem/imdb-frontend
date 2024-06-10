import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import './login.css';
import UserApi from '../../api/UserApi';

const Login = ({ setUserEmail }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const clientId = 'YOUR_GOOGLE_CLIENT_ID';

    const onSuccess = (response) => {
        console.log('Login Success: currentUser:', response.profileObj);
        // Giriş başarılı olursa burada kullanıcının bilgilerini işleyebilirsiniz
    };

    const onFailure = (response) => {
        console.log('Login failed: res:', response);
        // Giriş başarısız olursa hata yönetimini burada yapabilirsiniz
    };

    const handleSubmit = async (event) => {
        let userApi = new UserApi();
        event.preventDefault();
        try {
            const response = await userApi.login(email, password);
            console.log(response);

            if (response.data.result) {
                setUserEmail(email);
                navigate('/');
            } else {
                // Handle login failure (e.g., show a message to the user)
                console.log('Login failed:', response.data.description);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <Container className="container-style">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        className="input-style"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="input-style"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="button-style">
                    Giriş Yap
                </Button>
            </Form>
            <p>
                Hesabınız yok mu?{' '}
                <Link to="/signin" className="link-style">
                    Kayıt olun
                </Link>
            </p>
            <GoogleLogin
                clientId={clientId}
                buttonText="Google ile Giriş Yap"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </Container>
    );
}

export default Login;
