import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const { id } = useParams();
    // <Route path="/movie/:id">에서 : 다음 것을 가져온다.

    const getMovie = useCallback(async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        setMovies(json.data.movie);
        setLoading(false);
    }, [id]);

    useEffect(() => {
        getMovie();
    }, [getMovie]);

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <div key={movies.id}>
                        <img
                            src={movies.medium_cover_image}
                            alt={movies.small_cover_image}
                        />
                        <h2>{movies.title}</h2>
                        <p>
                            {`${movies.description_intro}` === ""
                                ? "No Summary..."
                                : `${movies.description_intro}`}
                        </p>
                        <ul>
                            {movies.genres.map((g) => (
                                <li key={g}>Genres: {g}</li>
                            ))}
                            <br />
                            <li>Year: {movies.year}</li>
                            <li>⭐️: {movies.rating}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
