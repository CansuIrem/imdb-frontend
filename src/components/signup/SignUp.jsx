import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./signup.css";
import UserApi from '../../api/UserApi';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
  });


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    let userApi = new UserApi();
    try {
      const response = await userApi.signup(formData);

      if (response.data.result) {
        setSuccess(response.data.description);
        setError('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          country: '',
          city: '',
        });
      } else {
        setError(response.data.description);
        setSuccess('');
      }
    } catch (err) {
      setError('Şifre 8 karakterden uzun olmalı.');
      setSuccess('');

    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group controlId="formFirstName">
        <Form.Label>Ad</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="Adınızı girin"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Soyad</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Soyadınızı girin"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Email adresinizi girin"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Şifre</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Şifrenizi girin"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Şifre Tekrar</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Şifrenizi tekrar girin"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCountry">
        <Form.Label>Ülke</Form.Label>
        <Form.Control
          type="text"
          name="country"
          placeholder="Ülkenizi girin"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCity">
        <Form.Label>Şehir</Form.Label>
        <Form.Control
          type="text"
          name="city"
          placeholder="Şehrinizi girin"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Hesap Oluştur
      </Button>
      <br />
      <br />
      <p>
        Hesabınız var mı?{' '}
        <Link to="/login">Giriş yapın</Link>
      </p>
    </Form>
  );
};

export default SignUp;