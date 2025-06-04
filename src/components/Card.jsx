import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { removeFromLikedMovies } from "../store";
import { useDispatch } from "react-redux";

export default React.memo(function Card({ movieData = {}, isLiked = false }) {
  const [isHoverd, setIsHoverd] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromList = () => {
    if (email) {
      dispatch(removeFromLikedMovies({ email, movieId: movieData.id })); 
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={movieData.name || "Movie Poster"}
      />

      {isHoverd && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={movieData.video || video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")} />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove From List" onClick={removeFromList} />
                ) : (
                  <AiOutlinePlus title="Add to My List" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {(movieData.genres || []).map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;

    .image-video-container {
      position: relative;
      height: 140px;

      img,
      video {
        width: 100%;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        position: absolute;
      }

      img {
        height: 104px;
        z-index: 5;
      }

      video {
        height: 140px;
        z-index: 4;
      }
    }

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }

    .icons {
      .controls {
        display: flex;
        gap: 1.5rem;
      }

      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #b8b8b8;
        }
      }
    }

    .genres {
      ul {
        display: flex;
        gap: 1rem;
        padding: 0;
        list-style: none;

        li {
          padding-right: 0.7rem;
        }
      }
    }
  }
`;
