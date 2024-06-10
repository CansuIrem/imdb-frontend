import React, { useEffect, useState } from "react";
import MovieApi from "../../api/MovieApi";
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "./home.css";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await new MovieApi().getAll();
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies", error);
            }
        };

        fetchMovies();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Number of cards to show at a time
        slidesToScroll: 6,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="home">
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <div key={index} className="card-wrapper">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Home;
