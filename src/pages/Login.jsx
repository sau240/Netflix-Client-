import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      alert("Login successful!");
    } catch (err) {
      console.log(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser && location.pathname === "/login") {
        navigate("/", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container">
          <div className="form-box">
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, [e.target.name]: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, [e.target.name]: e.target.value })
              }
            />
            <button onClick={handleLogIn}>Log In</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    display: grid;
    grid-template-rows: 15vh 85vh;
  }

  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-box {
    background-color: rgba(36, 31, 31, 0.36);
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

    h3 {
      margin: 0;
      color: #e50914;
    }

    input {
      width: 300px;
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: #e50914;
      }
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: #e50914;
      border: none;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #c40812;
      }
    }
  }
`;
