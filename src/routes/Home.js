import Movie from "../components/Movie";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const response = await fetch(
            "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);

    // map을 쓸 떄마다 key를 줘야한다. -> map 안에서 component들을 render할 때 사용하는 것
    // array -> map 사용
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movies}>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            medium_cover_image={movie.medium_cover_image}
                            small_cover_image={movie.small_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres}
                            year={movie.year}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
