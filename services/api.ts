// const url ="https://www.omdbapi.com/?apikey=2f7378ad&s=movie&y=2025&type=movie"




export const API_CONFIG ={
    BASE_URL:'https://www.omdbapi.com',
    API_KEY:"2f7378ad"
}

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface OmdbResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
}

export const fetchMovies = async (): Promise<OmdbResponse | null> => {
    const endpoint = `${API_CONFIG.BASE_URL}?apikey=${API_CONFIG.API_KEY}&s=movie&y=2025&type=movie`;
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: OmdbResponse = await response.json();

        return data;
    } catch (err) {
        console.error("error", err);
        return null;
    }
};
