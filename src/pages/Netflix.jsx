import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp"; 
import Navbar from "../components/Navbar";
import Slider from "../components/Slider"; 
import { fetchMovies, getGenres } from "../store";


export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(()=> {
    dispatch(getGenres());
  },[]);

  useEffect(() => {
  if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
}, [genresLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log();
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="background" className="background-image" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={() => navigate("/player")}>
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }

    .container {
      position: absolute;
      bottom: 5rem;
      left: 5rem;

      .logo img {
        width: 100%;
        max-width: 500px;
        height: auto;
      }

      .buttons {
        display: flex;
        margin-top: 2rem;
        gap: 1.5rem;

        button {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.4rem;
          border-radius: 0.2rem;
          padding: 0.5rem 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;

          &:hover {
            opacity: 0.8;
          }

          &:first-of-type {
            background-color: white;
            color: black;

            svg {
              font-size: 1.8rem;
            }
          }

          &:last-of-type {
            background-color: rgba(109, 109, 119, 0.7);
            color: white;

            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
