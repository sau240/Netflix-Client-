import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;

  .logo img {
    height: 5rem;
    
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #e50914; /* Netflix red */
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    transition: 0.3s ease;

    &:hover {
      background-color: #f6121d;
    }
  }
`;
