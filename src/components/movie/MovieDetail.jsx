import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './moviedetail.css';
import { Card, Container, Row, Col, Image, Badge } from 'react-bootstrap';

import { UserContext } from '../UserContext';

const MovieDetail = () => {
    const location = useLocation(); // useLocation kancasını kullanarak state'i al
    const { movie } = location.state; // state'ten movie verisini al
  const navigate = useNavigate();
    const { userEmail, setUserEmail } = useContext(UserContext);



    function handleWatchlistClick() {
        if (!userEmail) {
            navigate('/login');
        }
    }
    return (
        <Container className="movie-detail">
            <Row className='title'>
                <Col md={2}>
                    <h1>{movie.name}</h1>
                </Col>
                <Col md={7}></Col>
                <Col md={1}>
                    <p>IMDb RATING</p>
                    <span className="star">&#9733;</span>
                    <span className="rating">{movie.rating} <span className='ten'>/ 10</span></span>
                </Col>
                <Col md={1}>
                    <p>YOUR RATING</p>
                    <span onClick={handleWatchlistClick} className='rate-container'>
                        <span className="blue-star">&#9733;</span>
                        <span className="blue-star">{' '}Rate </span>
                    </span>
                </Col>
                <Col md={1}>
                    <p>POPULARITY</p>
                    <span className='popularity'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="lightgreen" class="bi bi-arrow-up-right-circle-fill" viewBox="0 0 16 16">
                            <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z" />
                        </svg>
                        <h4>{movie.popularity}</h4>
                    </span>

                </Col>
            </Row>
            <Row className='down-title'>
                <Col md={3}>
                    <Badge bg="secondary">Movie </Badge>{' '}
                    <Badge bg="dark"> </Badge>{' '}
                    <Badge bg="secondary">{movie.releaseDate}</Badge>{' '}
                    <Badge bg="dark"> </Badge>{' '}
                    <Badge bg="secondary">{movie.duration} min</Badge>{' '}
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Image
                        src={movie.photo || 'https://via.placeholder.com/250x460.png?text=No+Image'}
                        alt={movie.name}
                        className="movie-photo"
                    />
                </Col>
                <Col md={7}>
                    <div className="movie-video">
                        <iframe
                            width="100%"
                            height="380"
                            src={movie.trailer || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </Col>
                <Col md={2} className="movie-extras">
                    <Row md={12}>
                        <Card className="extra-card">
                            <Card.Body>
                                <Card.Title>34 PHOTOS</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row md={10}>
                        <Card className="extra-card">
                            <Card.Body>
                                <Card.Title>14 VIDEOS</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Row>
            <Row className="movie-info">
                <Col md={12}>
                    <p>{movie.description}</p>
                </Col>
            </Row>

        </Container>
    );
}

export default MovieDetail;
