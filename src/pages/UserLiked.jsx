import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { getUserLikedMovies } from "../store";
import Navbar from '../components/Navbar';
import Card from "../components/Card";
import NotAvailable from "../components/NotAvailable";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.pageYOffset !== 0);
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content">
        <h1>My List</h1>
        <div className="grid">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
            ))
          ) : (
            <NotAvailable />
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
