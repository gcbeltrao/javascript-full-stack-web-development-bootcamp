import quicksort from "../utils/quickSort.js";
import axios from "axios";

const Authorization = `Bearer ${process.env.Authorization}`;
const apiUrlSearch = "https://api.themoviedb.org/3/search/movie?query=Nemo";
const apiUrlById = "https://api.themoviedb.org/3/movie/";
const apiUrlAccount =
  "https://api.themoviedb.org/3/account/21753872/rated/movies";
const movieList = [];

export const renderHome = (req, res) => {
  quicksort(movieList, 0, movieList.length - 1);
  return res.render("index.ejs", {
    title: "My Top Movies",
    movieList,
  });
};

export const renderCreatePage = (req, res) => {
  return res.render("make-movie.ejs", { title: "Add Movie" });
};

export const createMovie = async (req, res) => {
  try {
    const config = {
      params: { query: req.body.title },
      headers: {
        Authorization: Authorization,
      },
    };
    const response = await axios.get(apiUrlSearch, config);
    const data = response.data.results;
    return res.render("select.ejs", {
      movieSearch: data,
      title: "Select a Movie",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addMovie = async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: Authorization,
      },
    };
    const response = await axios.get(apiUrlById + req.params.id, config);
    const data = response.data;

    const movie = {
      id: data.id,
      title: data.title,
      year: data.release_date,
      rating: 0,
      review: "",
      description: data.overview,
      imgUrl: "https://image.tmdb.org/t/p/w500" + data.poster_path,
      ranking: 0,
    };

    movieList.push(movie);
    return res.redirect("/movies/" + data.id);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const renderEditPage = (req, res) => {
  const movieId = req.params.id;
  const movie = movieList.find((movie) => movie.id == movieId);

  if (movie) {
    return res.render("update-movie.ejs", {
      title: "Edit Movie",
      movie: movie,
    });
  }
  return res.status(404).send("Movie not found");
};

export const editMovie = (req, res) => {
  const movieId = req.params.id;
  const movie = movieList.find((movie) => movie.id == movieId);

  if (movie) {
    movie.rating = parseFloat(req.body.rating);
    movie.review = req.body.review;
    return res.redirect("/");
  }
  return res.status(404).send("Movie not found");
};

export const deleteMovie = (req, res) => {
  const movieId = req.params.id;
  const movie = movieList.find((movie) => movie.id == movieId);

  if (movie) {
    movieList.splice(movieList.indexOf(movie), 1);
    return res.redirect("/");
  }
  return res.status(404).send("Movie not found");
};

export const importUserMovies = async (req, res) => {
  try {
    let currentPage = 1;
    let totalPages;

    do {
      const config = {
        params: { page: currentPage },
        headers: {
          Authorization: Authorization,
        },
      };
      const response = await axios.get(apiUrlAccount, config);
      const data = response.data;
      const movies = data.results;
      totalPages = data.total_pages;
      movies.forEach((movie) => {
        const content = {
          id: movie.id,
          title: movie.title,
          year: movie.release_date,
          rating: movie.rating,
          review: "",
          description: movie.overview,
          imgUrl: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          ranking: 0,
        };
        movieList.push(content);
      });
      currentPage++;
    } while (currentPage <= totalPages);
    return res.redirect("/");
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).send("Failed to fetch movies.");
  }
};

export const deleteAllMovies = (req, res) => {
  movieList.length = 0;
  return res.redirect("/");
};
