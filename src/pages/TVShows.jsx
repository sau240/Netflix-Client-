import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre"; // adjust path if different
import NotAvailable from "../components/NotAvailable";


// Change imports to named imports (curly braces)
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);


  useEffect(() => {
    console.log("in use effect");
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
  if (genresLoaded) {
    dispatch(fetchMovies({ type: "tv" })); // <-- fix here
  }
}, [genresLoaded, dispatch]);
  

  useEffect(() => {
  let timeoutId = null;
  const handleScroll = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsScrolled(window.pageYOffset !== 0);
    }, 100); // adjust delay
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(timeoutId);
  };
}, []);


  useEffect(() => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/");  // redirect to login if NOT logged in
    }
  });
  return unsubscribe;  // cleanup listener on unmount
}, [navigate]);


  console.log("Navbar:", Navbar);
console.log("Slider:", Slider);


  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
     
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {
          movies.length ? <Slider movies={movies} /> : <NotAvailable />
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
.data{
margin-top: 8rem;
.not-available{
text-align: center;
color:white;
}
}
`;
