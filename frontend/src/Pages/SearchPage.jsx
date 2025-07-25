import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router'; // Import useLocation and Link from react-router-dom

// IMPORTANT: For production, keep your API key secure using environment variables (e.g., process.env.REACT_APP_TMDB_API_KEY)
// For demonstration, it's placed directly, but this is NOT recommended for live apps.
const TMDB_API_KEY = 'eb8adaea7ebb8181f0075fa4605b2ae8';

const SearchPage = () => {
    const location = useLocation(); // Hook to access the current URL's location object
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to parse query parameters from the URL
    // useQuery is a custom hook to get URLSearchParams
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };

    let query = useQuery();
    const searchTerm = query.get('query'); // Get the 'query' parameter from the URL (e.g., 'interstellar' from ?query=interstellar)

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchTerm) {
                // If no search term, clear results and stop loading
                setSearchResults([]);
                setLoading(false);
                return;
            }

            setLoading(true); // Start loading state
            setError(null);    // Clear any previous errors

            try {
                // Fetch for movies
                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&language=en-US`
                );
                if (!movieResponse.ok) {
                    throw new Error(`HTTP error! status: ${movieResponse.status}`);
                }
                const movieData = await movieResponse.json();
                const movies = movieData.results.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    type: 'movie',
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    // You can include other relevant movie properties here
                }));

                // Fetch for TV shows
                const tvResponse = await fetch(
                    `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&language=en-US`
                );
                if (!tvResponse.ok) {
                    throw new Error(`HTTP error! status: ${tvResponse.status}`);
                }
                const tvData = await tvResponse.json();
                const tvShows = tvData.results.map(tv => ({
                    id: tv.id,
                    title: tv.name, // TV shows use 'name' for title
                    type: 'tv show',
                    poster_path: tv.poster_path,
                    first_air_date: tv.first_air_date,
                    // You can include other relevant TV show properties here
                }));

                // Combine results from both searches
                const combinedResults = [...movies, ...tvShows].sort((a, b) => {
                    // Example sorting: prioritize items with posters, then by type (movies before TV), then by title
                    if (a.poster_path && !b.poster_path) return -1;
                    if (!a.poster_path && b.poster_path) return 1;
                    if (a.type === 'movie' && b.type === 'tv show') return -1;
                    if (a.type === 'tv show' && b.type === 'movie') return 1;
                    return a.title.localeCompare(b.title);
                });

                setSearchResults(combinedResults);
            } catch (err) {
                setError(`Failed to fetch search results: ${err.message}`);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchSearchResults();
    }, [searchTerm]); // Dependency array: re-run effect whenever searchTerm changes

    const getPosterUrl = (path) => {
        // TMDb image base URL and size (w200 for posters)
        return path ? `https://image.tmdb.org/t/p/w200${path}` : 'https://via.placeholder.com/200x300?text=No+Image';
    };

    if (loading) {
        return <div className="text-white text-center p-8">Loading search results...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-8">Error: {error}</div>;
    }

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <h1 className="text-3xl font-bold mb-6">
                {searchTerm ? `Search Results for "${searchTerm}"` : "Please enter a search term."}
            </h1>
            {searchResults.length === 0 && searchTerm ? (
                <p>No results found for "{searchTerm}".</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((item) => (
                        <Link
                            key={item.id}
                            // Construct the link based on item type to navigate to the correct detail page
                            to={item.type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
                            className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-200"
                        >
                            <img
                                src={getPosterUrl(item.poster_path)}
                                alt={item.title}
                                className="w-full h-auto rounded-md mb-3 object-cover"
                                style={{ maxHeight: '300px' }} // Limit image height for consistency
                            />
                            <h2 className="text-xl font-semibold text-center mb-1">{item.title}</h2>
                            <p className="text-gray-400 capitalize text-sm">
                                {item.type}{' '}
                                {item.release_date || item.first_air_date
                                    ? `(${new Date(item.release_date || item.first_air_date).getFullYear()})`
                                    : ''}
                            </p>
                            {/* You can add more details here, e.g., vote average, overview snippet */}
                        </Link>
                    ))}
                </div>
            )}
            
        </div>
    );
};


export default SearchPage;