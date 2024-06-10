import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Yönlendirme için useNavigate kancası
import "./home.css";
import { UserContext } from '../UserContext';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate(); // useNavigate kancasını kullan
    const { userEmail, setUserEmail } = useContext(UserContext);

    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`, { state: { movie } }); // Yönlendirme işlemi ve film verisini state olarak geç
    };

    function handleWatchlistClick() {
        if (!userEmail) {
            navigate('/login');
        }
    }

    return (
        <Card className="movie-card" style={{ cursor: "pointer" }}>
            <div onClick={handleCardClick} className="image-container">
                <Card.Img className="movie-image" variant="top" src={movie.photo || "https://via.placeholder.com/500"} />
            </div>
            <Card.Body className="card-body">
                <div className="rating-container">
                    <span className="star">&#9733;</span>
                    <span className="rating">{movie.rating}</span>
                </div>
                <Card.Title onClick={handleCardClick} className="card-title">{movie.name}</Card.Title>
                <Button onClick={handleWatchlistClick}
                    variant="secondary" className="watchlist-button">
                    <span className="plus-icon">+</span>
                    <span className="watchlist">Watchlist</span>
                </Button>
                <div className="trailer-bar">
                    <Button className="trailer-button" variant="dark" href={movie.trailer}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="caret" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                            <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                        </svg>Trailer
                    </Button>
                    <svg xmlns="http://www.w3.org/2000/svg" id="info" width="32" height="32" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 25 25">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                </div>

            </Card.Body>
        </Card>
    );
};

export default MovieCard;
