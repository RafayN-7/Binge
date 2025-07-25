import React, { useEffect, useState } from 'react';
// Corrected import for Link from 'react-router-dom'
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CardList = ({ title, category }) => {
    const [data, setData] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjhhZGFlYTdlYmI4MTgxZjAwNzVmYTQ2MDViMmFlOCIsIm5iZiI6MTc1MTc5MzYwNi42NDksInN1YiI6IjY4NmEzZmM2MDM3YjU4ZTQxYTcwMjc4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XHV99URez_MPe9LT1hOVKXimGBRFtnptNcZX18JNgo'
        }
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
            options)
            .then(res => res.json())
            .then(res => setData(res.results))
            .catch(err => console.error(err));
    }, [category]);

    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

            
            <Swiper
                modules={[Grid, Pagination, Navigation]}
                Grid={{
                    rows: 2,
                    fill: 'row',
                }}
                slidesPerView={6}
                spaceBetween={10}
                navigation={true}
                className="mySwiper" // Make sure this matches your CSS class
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/movie/${item.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                                alt={item.original_title || "Movie Backdrop"}
                                className="h-44 w-full object-center object-cover" // Ensure this has the rounded-corners style from CSS
                            />
                            {item.vote_average && ( // Conditionally render rating if available
                                <div className="rating-badge">
                                    <span className="star">⭐</span>
                                    {item.vote_average.toFixed(1)}
                                </div>
                            )}
                            <p className="card-title">{item.original_title}</p> {/* Apply new title class */}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardList;